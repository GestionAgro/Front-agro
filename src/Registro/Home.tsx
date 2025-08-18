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





