import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import { Link } from "react-router-dom";

const provider = new GoogleAuthProvider();

export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
      try {
    const credenciales = await signInWithEmailAndPassword(auth, email, password);
    const user = credenciales.user;


    await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: user.displayName || user.email?.split("@")[0],
        email: user.email,
        rol: "usuario"
      })
    });

    console.log("Login exitoso y usuario guardado en Mongo");
  } catch (err: any) {
    setError(err.message);
  }
};

const handleGoogleLogin = async() =>{
     try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: user.displayName || "",
        email: user.email,
        rol: "usuario"
      })
    });

    console.log("Login con Google exitoso y guardado en Mongo");
  } catch (err: any) {
    setError(err.message);
  }
};
  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <button onClick={handleGoogleLogin}>Entrar con Google</button>
      {error && <p style={{ color: "red" }}>{error}</p>}


      <p>
        ¿No tenés cuenta?{" "}
        <Link to="/registro">
          Crear una cuenta
        </Link>
      </p>
    </div>
  );
}