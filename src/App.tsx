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
import VerFactura from "./Facturas/VerFacturas";
import VerRemito from "./Remitos/VerRemito";
import AgregarProducto from "./Stock/AgregarProducto";
import ListarProductos from "./Stock/ListarProductos";
import Navbar from "./componentes/Navbar";
import EditarFactura from "./Facturas/EditarFactura";
import ListarAuditorias from "./Facturas/ListarAuditoriasFactura";
import VerAuditoriaFactura from "./Facturas/VerAuditoriaFactura";


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
      {user && <Navbar/>}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/registro" element={!user ? <Registro /> : <Navigate to="/" />} />
         {/*rutas de remitos*/}
        <Route path="/remitos" element={user ? <ListarRemitos /> : <Navigate to="/login" />} />
        <Route path="/remitos/nuevo" element={<AgregarRemito />} />
        <Route path="/remitos/:id" element={user ? <VerRemito /> : <Navigate to="/login" />} />
         {/* Rutas de facturas */}
        <Route path="/facturas" element={user ? <ListarFacturas /> : <Navigate to="/login" />} />
        <Route path="/facturas/nueva" element={user ? <AgregarFactura /> : <Navigate to="/login" />} />
        <Route path="/facturas/:id" element={user ? <VerFactura /> : <Navigate to="/login" />} />
        <Route path="/facturas/:id/editar" element={user ? <EditarFactura /> : <Navigate to="/login" />} />
        <Route path="/auditorias" element={user ? <ListarAuditorias /> : <Navigate to="/login" />} />
        <Route path="/auditorias-factura/:id" element={user ? <VerAuditoriaFactura /> : <Navigate to="/login" />} />
        {/* Rutas de personas */}
        <Route path="/empleados" element={user ? <ListarEmpleados /> : <Navigate to="/login" />} />
        <Route path="/empleados/nuevo" element={<AgregarEmpleado />} />
        {/* Rutas de productos */}
        <Route path="/productos" element={user ? <ListarProductos /> : <Navigate to="/login" />} />
        <Route path="/productos/nuevo" element={user ? <AgregarProducto /> : <Navigate to="/login" />} />


      </Routes>
    </Router>
  );
}

