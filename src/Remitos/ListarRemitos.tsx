import { useEffect, useState } from "react";
import "./css/ListaRemitos.css";
import { useNavigate } from "react-router-dom";
import Modal from "../componentes/Modal";
import RemitosTable from "./RemitosTable";
import { useAuth } from "../componentes/AuthContex";
import { deleteRemito, getAllRemitos } from "./RemitoService";
import type { Remito } from "../entidades/Remitos";


 const ListarRemitos = () => {
    const navigate = useNavigate();
    const [remitos, setRemitos] = useState<Remito[]> ([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [remitoSeleccionado, setRemitoSeleccionado] = useState<Remito | null>(null);
    const { hasPermission } = useAuth();


    useEffect(()=>{
    const obtenerRemitos = async () => {
        try{
          const data = await getAllRemitos();
          setRemitos(data);
        } catch {
        setMensaje("Error al obtener los remitos");
        setModalError(true);
      }
    };
    obtenerRemitos();
}, []);


   const confirmarEliminar = (remito: Remito) => {
    setRemitoSeleccionado(remito);
    setModalOpen(true);
  };

  const eliminarRemito = async () => {
    if (!remitoSeleccionado?._id){
    setMensaje("El remito no tiene ID válido");
    setModalError(true);
    return;return;}

    try {
      await deleteRemito(remitoSeleccionado._id);
      setRemitos((prev) => prev.filter((r) => r._id !== remitoSeleccionado._id));
      setModalOpen(false);
    } catch {
      setMensaje("Error al eliminar el remito");
      setModalError(true);
    }
  };

  return (
    <div className="contenedor">
      <div className="header-remitos">
        <h1>Lista de Remitos</h1>

        {hasPermission("crear") && (
        <div className="filtro-boton-container">
        <button onClick={() => navigate("/remitos/nuevo")} className="btn-agregar">
          Agregar Remito
        </button>
        </div>
        )}
      </div>

      <RemitosTable rows={remitos} onDelete={confirmarEliminar} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>¿Eliminar remito?</h2>
        {remitoSeleccionado && (
          <p>
            ¿Seguro que querés borrar el remito #
            {remitoSeleccionado.numero_remito} de{" "}
            {remitoSeleccionado.empresa}?
          </p>
        )}
        <div className="modal-actions">
          <button onClick={() => setModalOpen(false)}>Cancelar</button>
          <button onClick={eliminarRemito}>Confirmar</button>
        </div>
      </Modal>
      <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <p>{mensaje}</p>
      </Modal>
    </div>
  );
};
export default ListarRemitos;