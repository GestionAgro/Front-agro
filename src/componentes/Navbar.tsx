import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/FirebaseConfig";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { useAuth } from "./AuthContex";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const { hasPermission } = useAuth();

  return (
    <nav className="navbar navbar-dark navbar-custom fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          🐄
        </Link>
        <button
          className="navbar-toggler me-auto" type="button" aria-controls="offcanvasNavbar" onClick={() => setShow(true)}><span className="navbar-toggler-icon"></span>
        </button>


        <div
          className={`offcanvas offcanvas-start offcanvas-custom ${show ? "show" : ""}`}
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ visibility: show ? "visible" : "hidden" }}
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menú 🐮
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Cerrar"
              onClick={() => setShow(false)}
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setShow(false)}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/remitos" onClick={() => setShow(false)}>
                  Remitos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/facturas" onClick={() => setShow(false)}>
                  Facturas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos" onClick={() => setShow(false)}>
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/empleados" onClick={() => setShow(false)}>Empleados</Link>
              </li>

              <li className="nav-item">
               {hasPermission("auditar") && <Link className="nav-link"to="/auditorias-factura"onClick={() => setShow(false)}>Auditorías facturas</Link>}
              </li>

              <li className="nav-item">
              {hasPermission("auditar") && <Link className="nav-link"to="/auditorias-remito"onClick={() => setShow(false)}> Auditorías de Remitos</Link>}
              </li>

              <li className="nav-item">
               {hasPermission("auditar") && <Link className="nav-link"to="/auditorias-stock"onClick={() => setShow(false)}>Auditorías de Stock</Link>}
              </li>
              <li className="nav-item">
                {hasPermission("administrar") && <Link className="nav-link" to="/usuarios"onClick={() => setShow(false)}>Gestión de Usuarios </Link>}
                </li>

                <li className="nav-item">
                 {hasPermission("auditar") && (<Link className="nav-link" to="/eventos"onClick={() => setShow(false)}>Eventos</Link>)}
                 </li>
            </ul>
          </div>
        </div>


        {auth.currentUser && (
          <div className="d-flex align-items-center ms-auto">
            <span className="me-3 text-white">{auth.currentUser.email}</span>
            <button
              onClick={() => signOut(auth)}
              className="btn btn-sm btn-outline-light"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
