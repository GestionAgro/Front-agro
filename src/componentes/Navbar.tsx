import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
  <nav className="navbar navbar-dark navbar-custom fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">🐮</a>
    <button
      className="navbar-toggler me-auto"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNavbar"
      aria-controls="offcanvasNavbar"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div
      className="offcanvas offcanvas-start offcanvas-custom"
      tabIndex={-1}
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú 🐮</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to= "/remitos">Remitos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/facturas">Facturas</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stock">Stock</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/empleados">Empleados</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

