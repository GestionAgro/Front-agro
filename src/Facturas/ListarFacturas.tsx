import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import "../Remitos/ListaRemitos.css"
import { useNavigate } from "react-router-dom";
import Modal from "../componentes/Modal";

const ListarFacturas = () => {
  const OBTENER_FACTURAS = "/facturas";
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [fechaFiltro, setFechaFiltro] = useState<string>("");

  const [modalOpen, setModalOpen] = useState(false);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<any>(null);

  const [modalAsociarOpen, setModalAsociarOpen] = useState(false);
  const [remitoInput, setRemitoInput] = useState("");

  useEffect(() => {
    const obtenerFacturas = async () => {
      try {
        const response = await apiClient.get(OBTENER_FACTURAS);
        setFacturas(response.data);
      } catch (err: any) {
        setError("Error al obtener las facturas");
      }
    };
    obtenerFacturas();
  }, []);

  const facturasFiltradas = fechaFiltro
    ? facturas.filter(
        (f) =>
          new Date(f.fecha).toLocaleDateString() ===
          new Date(fechaFiltro).toLocaleDateString()
      )
    : facturas;

  const confirmarEliminar = (factura: any) => {
    setFacturaSeleccionada(factura);
    setModalOpen(true);
  };

  const eliminarFactura = async () => {
    try {
      await apiClient.delete(`/facturas/${facturaSeleccionada._id}`);
      setFacturas(facturas.filter((f) => f._id !== facturaSeleccionada._id));
      setModalOpen(false);
    } catch (err) {
      alert("Error al eliminar la factura");
    }
  };


  const abrirModalAsociar = (factura: any) => {
    setFacturaSeleccionada(factura);
    setRemitoInput("");
    setModalAsociarOpen(true);
  };


  const asociarRemito = async () => {
    if (!remitoInput) return alert("Ingrese un número de remito");

    try {
      const response = await apiClient.put(
        `/facturas/${facturaSeleccionada._id}/asociar-remito`,
        { numero_remito: Number(remitoInput), estado: "IMPUTADO" }
      );


      setFacturas(
        facturas.map((f) =>
          f._id === facturaSeleccionada._id ? response.data : f
        )
      );

      setModalAsociarOpen(false);
    } catch (err: any) {
      alert("Error al asociar el remito: " + err.message);
    }
  };

  return (
    <div className="contenedor">
      <div className="header-remitos">
        <h1>Lista de Facturas</h1>
      </div>
      {error && <p className="error">{error}</p>}

      <div className="filtro-boton-container">
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
        <button
          onClick={() => navigate("/facturas/nueva")}
          className="btn-agregar"
        >
          Agregar Factura
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Tipo</th>
            <th>Empresa</th>
            <th>Importe</th>
            <th>Estado</th>
            <th>Remito</th>
            <th>Recibido por</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturasFiltradas.map((factura) => (
            <tr key={factura._id}>
              <td>{factura.numero_factura}</td>
              <td>{factura.tipo_factura}</td>
              <td>{factura.empresa}</td>
              <td>{factura.importe}</td>
              <td>{factura.estado}</td>
              <td>{factura.numero_remito ?? "—"}</td>
              <td>{factura.recibido_por?.nombre || "Sin asignar"}</td>
              <td>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => confirmarEliminar(factura)}
                >
                  Eliminar
                </button>
                <button
                  type="button"
                  className="btn-asociar"
                  onClick={() => abrirModalAsociar(factura)}
                >
                  Asociar Remito
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>¿Eliminar factura?</h2>
        {facturaSeleccionada && (
          <p>
            ¿Seguro que querés borrar la factura #
            {facturaSeleccionada.numero_factura} de{" "}
            {facturaSeleccionada.empresa}?
          </p>
        )}
        <div className="modal-actions">
          <button onClick={() => setModalOpen(false)}>Cancelar</button>
          <button onClick={eliminarFactura}>Confirmar</button>
        </div>
      </Modal>


      <Modal isOpen={modalAsociarOpen} onClose={() => setModalAsociarOpen(false)}>
        <h2>Asociar remito a factura</h2>
        {facturaSeleccionada && (
          <p>
            Factura #{facturaSeleccionada.numero_factura} - {facturaSeleccionada.empresa}
          </p>
        )}
        <input
          type="number"
          placeholder="Número de remito"
          value={remitoInput}
          onChange={(e) => setRemitoInput(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={() => setModalAsociarOpen(false)}>Cancelar</button>
          <button onClick={asociarRemito}>Asociar</button>
        </div>
      </Modal>
    </div>
  );
};

export default ListarFacturas;
