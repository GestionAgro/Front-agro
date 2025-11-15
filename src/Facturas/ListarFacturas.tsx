import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import "../Remitos/css/ListaRemitos.css"
import { useNavigate } from "react-router-dom";
import Modal from "../componentes/Modal";
import FacturasTable from "./FacturasTable";
import { auth } from "../config/FirebaseConfig";
import { useAuth } from "../componentes/AuthContex";
import { deleteFactura, getAllFacturas } from "./FacturaService";
import { getAllRemitos } from "../Remitos/RemitoService";
import type { Remito } from "../entidades/Remitos";
import type { Factura } from "../entidades/Factura";


const ListarFacturas = () => {
  const navigate = useNavigate();
  const [facturas, setFacturas] = useState<any[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura | null>(null);

  const [modalAsociarOpen, setModalAsociarOpen] = useState(false);
  const [remitoInput, setRemitoInput] = useState("");
  const [remitosDisponibles, setRemitosDisponibles] = useState<Remito[]>([]);
  const { hasPermission } = useAuth();

  useEffect(() => {
    const obtenerFacturas = async () => {
      try {
        const data = await getAllFacturas();
        setFacturas(data);
      } catch {
        setMensaje("Error al obtener las facturas");
        setModalError(true);
      }
    };
    obtenerFacturas();
  }, []);

  useEffect(()=>{
    const obtenerRemitosEnEspera = async () =>{
      try{
        const data = await getAllRemitos();
        const filtrados= data.filter((r) => r.estado === "PENDIENTE");
        setRemitosDisponibles(filtrados);
      } catch {
        setMensaje("Error al obtener los remitos");
        setModalError(true);
      }
    };
    obtenerRemitosEnEspera();
  }, [])

  const confirmarEliminar = (factura: Factura) => {
    setFacturaSeleccionada(factura);
    setModalOpen(true);
  };

  const eliminarFactura = async () => {
    if (!facturaSeleccionada?._id) {
    setMensaje("No hay factura seleccionada");
    setModalError(true);
    return;
  }
    try {
      await deleteFactura(facturaSeleccionada._id)
      setFacturas((prev)=> prev.filter((f) => f._id !== facturaSeleccionada._id));
      setModalOpen(false);
    } catch {
      setMensaje("Error al eliminar la factura");
      setModalError(true);
    }
  };


  const abrirModalAsociar = (factura: Factura) => {
    setFacturaSeleccionada(factura);
    setRemitoInput("");
    setModalAsociarOpen(true);
  };


  const asociarRemito = async () => {
    if (!remitoInput) {
      setMensaje("Ingrese un número de remito");
      setModalError(true);
      return;
    }
    if (!facturaSeleccionada) {
     setMensaje("No hay factura seleccionada");
      setModalError(true);
      return;
  }

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
    } catch {
     setMensaje("Error al asociar el remito");
     setModalError(true);
    }
  };

   return (
    <div className="contenedor">
      <div className="header-remitos">
        <h1>Lista de Facturas</h1>
      </div>

      <div className="filtro-boton-container">
        {hasPermission("crear") && (
        <button onClick={() => navigate("/facturas/nueva")}className="btn-agregar">
          Agregar Factura
        </button>
      )}
      </div>

      <FacturasTable
        rows={facturas}
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

      <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <p>{mensaje}</p>
      </Modal>
    </div>
  );
};
export default ListarFacturas;
