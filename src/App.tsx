import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import ListarAuditoriasStock from "./Stock/ListarAuditoriasStock";
import VerAuditoriaStock from "./Stock/VerAuditoriaStock";
import EditarProducto from "./Stock/EditarProducto";
import EditarPersona from "./personas/EditarPersona";
import ListarAuditoriasRemito from "./Remitos/ListarAuditoriaRemito";
import VerAuditoriaRemito from "./Remitos/VerAuditoriaRemito";
import { ProtectedRoute } from "./componentes/ProtectedRoute";
import ListarUsuarios from "./Usuarios/ListarUsuarios";
import ListarEventos from "./Eventos/ListarEventos";
import VerEvento from "./Eventos/VerEvento";
import ReporteRemitos from "./Remitos/ReporteRemitos";
import TotalesFacturasPorMes from "./Facturas/TotalFacturasPorMes";
import EditarRemito from "./Remitos/EditarRemito";
import { useAuth } from "./componentes/AuthContex";



export default function App() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="cargando-centro">
        <h2>Cargando...</h2>
      </div>
    );

  return (
    <Router>
      {user && <Navbar/>}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/registro" element={!user ? <Registro /> : <Navigate to="/" />} />

         {/*rutas de remitos*/}
        <Route path="/remitos" element={user ? <ListarRemitos /> : <Navigate to="/login" />} />
        <Route path="/remitos/nuevo" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}><AgregarRemito /></ProtectedRoute>} />
        <Route path="/remitos/:id" element={ <VerRemito />}> </Route>
        <Route path="/remitos/:id/editar"element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}><EditarRemito /></ProtectedRoute>}/>
        <Route path="/auditorias-remito" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <ListarAuditoriasRemito />  </ProtectedRoute>} />
        <Route path="/auditorias-remito/:id" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <VerAuditoriaRemito /> </ProtectedRoute>} />


         {/* Rutas de facturas */}
        <Route path="/facturas" element={user ? <ListarFacturas /> : <Navigate to="/login" />} />
        <Route path="/facturas/nueva" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <AgregarFactura />  </ProtectedRoute>} />
        <Route path="/facturas/:id" element={ <VerFactura />}> </Route>
        <Route path="/facturas/:id/editar" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <EditarFactura />  </ProtectedRoute>} />
        <Route path="/auditorias-factura" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <ListarAuditorias /> </ProtectedRoute>} />
        <Route path="/auditorias-factura/:id" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <VerAuditoriaFactura /> </ProtectedRoute>} />


        {/* Rutas de personas */}
        <Route path="/empleados" element={user ? <ListarEmpleados /> : <Navigate to="/login" />} />
        <Route path="/empleados/nuevo" element= {<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <AgregarEmpleado /> </ProtectedRoute>} />
        <Route path="/empleado/editar/:id" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <EditarPersona /> </ProtectedRoute>} />

        {/* Rutas de productos */}
        <Route path="/productos" element={user ? <ListarProductos /> : <Navigate to="/login" />} />
        <Route path="/productos/nuevo" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <AgregarProducto /> </ProtectedRoute>} />
        <Route path="/producto/editar/:id" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <EditarProducto /> </ProtectedRoute>} />
        <Route path="/auditorias-stock" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <ListarAuditoriasStock /> </ProtectedRoute>} />
        <Route path="/auditorias-stock/:id" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}> <VerAuditoriaStock /> </ProtectedRoute>} />

        {/* Rutas de usuarios */}
        <Route path="/usuarios" element={<ProtectedRoute allowedRoles={["ADMINISTRADOR"]}><ListarUsuarios /> </ProtectedRoute>}/>

         {/* Rutas de eventos */}
         <Route path="/eventos" element={<ListarEventos />} />
         <Route path="/eventos/:id" element={<VerEvento />} />

        {/*rutas de reporte*/}
        <Route path="/reportes" element={user ? <ReporteRemitos /> : <Navigate to="/login" />} />
        <Route path="/facturas/totales-por-mes" element={<TotalesFacturasPorMes />} />

      </Routes>
    </Router>
  );
}

