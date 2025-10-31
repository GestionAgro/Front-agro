import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";

type Rol = "ADMINISTRADOR" | "USUARIO";

interface AuthContextType {
  user: any;
  rol: Rol | null;
  hasPermission: (accion: string) => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  rol: null,
  hasPermission: () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [rol, setRol] = useState<Rol | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioFirebase) => {
      setUser(usuarioFirebase);
      if (usuarioFirebase) {
         const token = await usuarioFirebase.getIdToken();
      console.log(" Token Firebase:", token);


        const res = await fetch(`http://localhost:3000/usuarios/rol/${usuarioFirebase.uid}`);
        const data = await res.json();
        setRol(data.rol);
        console.log("Rol obtenido desde backend:", data.rol);

      } else {
        setRol(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const permisos: Record<Rol, string[]> = {
    ADMINISTRADOR: ["crear", "editar", "eliminar", "auditar", "ver", "reducir","administrar"],
    USUARIO: ["ver"],
  };

  const hasPermission = (accion: string) => {
    return rol ? permisos[rol].includes(accion) : false;
  };

  return (
    <AuthContext.Provider value={{ user, rol, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
