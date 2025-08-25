import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { Link } from "react-router-dom";
import  "./css/Registro.css"

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