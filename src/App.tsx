import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/FirebaseConfig";
import Login from "./Registro/Login";
import Registro from "./Registro/Registro";
import Home from "./Registro/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ListarRemitos from "./Remitos/ListarRemitos";
import AgregarRemito from "./Remitos/AgregarRemito";
import ListarFacturas from "./Facturas/ListarFacturas";
import AgregarFactura from "./Facturas/AgregarFactura";
import ListarEmpleados from "./personas/ListarPersonas";
import AgregarEmpleado from "./personas/AgregarPersona";



export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/registro" element={!user ? <Registro /> : <Navigate to="/" />} />
         {/*rutas de remitos*/}
        <Route path="/remitos" element={user ? <ListarRemitos /> : <Navigate to="/login" />} />
        <Route path="/remitos/nuevo" element={<AgregarRemito />} />

         {/* Rutas de facturas */}
        <Route path="/facturas" element={user ? <ListarFacturas /> : <Navigate to="/login" />} />
        <Route path="/facturas/nueva" element={user ? <AgregarFactura /> : <Navigate to="/login" />} />

        {/* Rutas de personas */}
        <Route path="/empleados" element={user ? <ListarEmpleados /> : <Navigate to="/login" />} />
        <Route path="/empleados/nuevo" element={<AgregarEmpleado />} />
      </Routes>
    </Router>
  );
}

