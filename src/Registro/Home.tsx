import React from "react";
import { auth } from "../config/FirebaseConfig";
import { signOut } from "firebase/auth";
import Navbar from "../componentes/Navbar";
import "./css/Home.css"

export default function Home() {
  return (
    <div className="main-content">
      <Navbar />
      <div style={{ marginTop: "150px" }}>
        <div className="home-container">
          <h1>🐄 Bienvenido {auth.currentUser?.email}</h1>
          <button onClick={() => signOut(auth)}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}






