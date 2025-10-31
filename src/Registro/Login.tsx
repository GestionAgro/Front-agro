import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { Link } from "react-router-dom";
import  "./css/Registro.css"
import type { Usuario } from "../entidades/Usuario";

const google = new GoogleAuthProvider();

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  try {
    const credenciales = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login exitoso:", credenciales.user.email);
  } catch (err: any) {
    const errores: Record<string, string> = {
      "auth/invalid-credential": "Correo o contraseña incorrectos"
    };

    setError(errores[err.code] || "Ocurrió un error inesperado");
  }
};


const handleGoogleLogin = async() =>{
     try {
    const resultado = await signInWithPopup(auth, google);
    const usuario = resultado.user;

    console.log("Login con Google exitoso:", usuario.email);

    const usuarioMongo: Partial<Usuario> = {
      nombre: usuario.displayName || usuario.email?.split("@")[0],
      email: usuario.email!,
      rol: "USUARIO",
      firebaseUid: usuario.uid,
    };
   const existe = await fetch(`http://localhost:3000/usuarios/uid/${usuario.uid}`);
    if (existe.status === 404) {

      await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioMongo),
      });
      console.log("usuario google guardado en Mongo");
    } else {
      console.log("usuario google ya existe en Mongo");
    }

  } catch (err: any) {
    setError(err.message);
  }
};
  return (
  <div className="auth-container">
    <div className="auth-card">
    <h2>Login 🐮</h2>
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Usuario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">LOGIN</button>
    </form>

    <button
      type="button"
      className="google-login"
      onClick={handleGoogleLogin}
    >
      Ingresar con Google
    </button>

    {error && <p style={{ color: "red" }}>{error}</p>}
    <p>
      ¿No tienes cuenta? <Link to="/registro">Crear una cuenta</Link>
    </p>
  </div>
</div>

  );
}