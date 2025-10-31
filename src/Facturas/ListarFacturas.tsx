import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import "../Remitos/css/ListaRemitos.css"
import { useFetcher, useNavigate } from "react-router-dom";
import Modal from "../componentes/Modal";
import FacturasTable from "./FacturasTable";
import { auth } from "../config/FirebaseConfig";
import { useAuth } from "../componentes/AuthContex";


const ListarFacturas = () => {
  const OBTENER_FACTURAS = "/facturas";
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [fechaFiltro, setFechaFiltro] = useState<string>("");

  const [modalOpen, setModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<any>(null);

  const [modalAsociarOpen, setModalAsociarOpen] = useState(false);
  const [remitoInput, setRemitoInput] = useState("");
  const [remitosDisponibles, setRemitosDisponibles] = useState<any[]>([]);
  const { hasPermission } = useAuth();

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

  useEffect(()=>{
    const obtenerRemitosEnEspera = async () =>{
      try{
        const response = await apiClient.get("/remitos");
        const filtrados= response.data.filter((r:any) => r.estado === "EN_ESPERA");
        setRemitosDisponibles(filtrados);
      } catch (err) {
        console.error("error al obtener remitos", err);
      }
    };
    obtenerRemitosEnEspera();
  }, [])

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
      if (!auth.currentUser) {
      setMensaje("Usuario no autenticado");
      setModalOpen(true);
      return;
    }
      const token = await auth.currentUser.getIdToken();

      await apiClient.delete(`/facturas/${facturaSeleccionada._id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });
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
      if (!auth.currentUser) {
      setMensaje("Usuario no autenticado");
      setModalOpen(true);
      return;
    }
    const token = await auth.currentUser.getIdToken();

      const response = await apiClient.put(
        `/facturas/${facturaSeleccionada._id}/asociar-remito`,
        { numero_remito: Number(remitoInput), estado: "IMPUTADO" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
        {hasPermission("crear") && (
        <button onClick={() => navigate("/facturas/nueva")}className="btn-agregar">
          Agregar Factura
        </button>
      )}
      </div>

      <FacturasTable
        rows={facturasFiltradas}
        onDelete={confirmarEliminar}
        onAsociar={abrirModalAsociar}
      />

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

      <Modal
        isOpen={modalAsociarOpen}
        onClose={() => setModalAsociarOpen(false)}
      >
        <h2>Asociar remito a factura</h2>
        {facturaSeleccionada && (
          <p>
            Factura #{facturaSeleccionada.numero_factura} -{" "}
            {facturaSeleccionada.empresa}
          </p>
        )}
        <input
          list="remitos-list"
          placeholder="Número de remito"
          value={remitoInput}
          onChange={(e) => setRemitoInput(e.target.value)}
        />
        <datalist id="remitos-list">
         {remitosDisponibles.map((r) => (
          <option key={r._id} value={r.numero_remito}>
            {r.numero_remito} - {r.empresa}
      </option>
    ))}
    </datalist>

        <div className="modal-actions">
          <button onClick={() => setModalAsociarOpen(false)}>Cancelar</button>
          <button onClick={asociarRemito}>Asociar</button>
        </div>
      </Modal>
    </div>
  );
};
export default ListarFacturas;
