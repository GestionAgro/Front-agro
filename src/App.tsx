import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/FirebaseConfig";
import Login from "./Registro/Login";
import Registro from "./Registro/Registro";
import Home from "./Registro/Home";

export default function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <Router>
      <Routes>
        {/* Rutas privadas */}
        <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
        {/* Rutas públicas */}
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/registro" element={!currentUser ? <Registro /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
