import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/FirebaseConfig";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { useAuth } from "./AuthContex";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const [reportesShow, setReportesShow] = useState(false);
  const { hasPermission } = useAuth();

  return (
    <nav className="navbar navbar-dark navbar-custom fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          🐄
        </Link>
        <button
          className="navbar-toggler me-auto"
          type="button"
          aria-controls="offcanvasNavbar"
          onClick={() => setShow(true)}>
          <span className="navbar-toggler-icon"></span>
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

              {/* Dropdown de Auditorías */}
              <li className="nav-item dropdown">
                {hasPermission("auditar") && (
                  <>
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="auditoriaDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Auditorías
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="auditoriaDropdown">
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/auditorias-factura"
                          onClick={() => setShow(false)}
                        >
                          Facturas
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/auditorias-remito"
                          onClick={() => setShow(false)}
                        >
                          Remitos
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/auditorias-stock"
                          onClick={() => setShow(false)}
                        >
                          Stock
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/eventos"
                          onClick={() => setShow(false)}
                        >
                          Eventos
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
              </li>

              {/* Dropdown de Reportes */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="reportesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setReportesShow(!reportesShow)}
                >
                  Reportes
                </a>
                <ul className={`dropdown-menu ${reportesShow ? "show" : ""} dropdown-menu-dark`} aria-labelledby="reportesDropdown">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/reportes"
                      onClick={() => setShow(false)}
                    >
                      Total de remitos por mes
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/facturas/totales-por-mes"
                      onClick={() => setShow(false)}
                    >
                      Total de importes por mes
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                {hasPermission("auditar") && (
                  <Link className="nav-link" to="/usuarios" onClick={() => setShow(false)}>Gestion de roles</Link>
                )}
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
