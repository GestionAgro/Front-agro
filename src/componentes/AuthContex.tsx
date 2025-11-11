import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import "./css/auth.css"

type Rol = "ADMINISTRADOR" | "USUARIO";

interface AuthContextType {
  user: any;
  rol: Rol | null;
  hasPermission: (accion: string) => boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  rol: null,
  hasPermission: () => false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [rol, setRol] = useState<Rol | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioFirebase) => {
      setUser(usuarioFirebase);
      if (usuarioFirebase) {
         const token = await usuarioFirebase.getIdToken();
      console.log(" Token Firebase:", token);


        const res = await fetch(`http://localhost:3000/usuarios/rol/${usuarioFirebase.uid}`,
        {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!res.ok) throw new Error ("Error al obtener el rol")
        const data = await res.json();
        setRol(data.rol);
        console.log("Rol obtenido desde backend:", data.rol);

      } else {
        setUser(null);
        setRol(null);
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const permisos: Record<Rol, string[]> = {
    ADMINISTRADOR: ["crear", "editar", "eliminar", "auditar", "ver", "reducir","administrar","asociar"],
    USUARIO: ["ver"],
  };

  const hasPermission = (accion: string) => {
    return rol ? permisos[rol].includes(accion) : false;
  };
  if (loading)
    return  (
    <div className="cargando-centro">
      <h2>Cargando...</h2>
    </div>
  );

  return (
    <AuthContext.Provider value={{ user, rol, hasPermission, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
