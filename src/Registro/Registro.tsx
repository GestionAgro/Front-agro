import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/FirebaseConfig";
import type { Usuario } from "../entidades/Usuario";
import  "./css/Registro.css"

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handlerRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números"
      );
      return;
    }

    try {
      const credencialesFirebase = await createUserWithEmailAndPassword(auth, email, password);
      const usuario = credencialesFirebase.user;


      const usuarioMongo: Partial<Usuario> = {
        nombre: nombre || usuario.email?.split("@")[0],
        email: usuario.email!,
        rol: "USUARIO",
      };

      await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioMongo),
      });

      console.log("Registro exitoso y usuario guardado en Mongo");
    } catch (err: any) {
      setError(err.message);
    }
  };

   return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registro</h2>
        <form onSubmit={handlerRegistro}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Registrar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}