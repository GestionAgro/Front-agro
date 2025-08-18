import React from "react";
import { auth } from "../config/FirebaseConfig";
import { signOut } from "firebase/auth";

export default function Home() {
  return (
    <div>
      <h1> 🐄Bienvenido {auth.currentUser?.email}</h1>
      <button onClick={() => signOut(auth)}>Cerrar sesión</button>
    </div>
  );
}




/*import type { Usuario } from "../entidades/Usuario";

const Home = ({ usuario }: { usuario: Usuario }) => {
  return (
    <div className="home-container">
      <h1>🐄 Gestión Agro</h1>
      <p>Bienvenido, {usuario.nombre}!</p>
      <p>Email: {usuario.email}</p>
      <p>Rol: {usuario.rol}</p>
    </div>
  );
};

export default Home;*/



