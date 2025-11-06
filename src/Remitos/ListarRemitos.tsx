import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import "./css/ListaRemitos.css";
import { useNavigate } from "react-router-dom";
import Modal from "../componentes/Modal";
import RemitosTable from "./RemitosTable";
import { auth } from "../config/FirebaseConfig";
import { useAuth } from "../componentes/AuthContex";
import { deleteRemito, getAllRemitos } from "./RemitoService";


 const ListarRemitos = () => {
    const navigate = useNavigate();
    const [remitos, setRemitos] = useState<any[]> ([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [remitoSeleccionado, setRemitoSeleccionado] = useState<any>(null);
    const { hasPermission } = useAuth();


    useEffect(()=>{
    const obtenerRemitos = async () => {
        try{
            const data = await getAllRemitos();
            setRemitos(data);
        } catch (err:any){
            console.error("error al obteenr los remitos :(");
        }
    };
    obtenerRemitos();
}, []);


   const confirmarEliminar = (remito: any) => {
    setRemitoSeleccionado(remito);
    setModalOpen(true);
  };

  const eliminarRemito = async () => {
    try {
      await deleteRemito(remitoSeleccionado._id);
      setRemitos(remitos.filter((r) => r._id !== remitoSeleccionado._id));
      setModalOpen(false);
    } catch (err) {
      alert("Error al eliminar el remito");
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
    </div>
  );
};
export default ListarRemitos;