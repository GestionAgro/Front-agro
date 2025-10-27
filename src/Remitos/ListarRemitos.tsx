import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import "./css/ListaRemitos.css";
import { useNavigate } from "react-router-dom";
import Modal from "../componentes/Modal";
import RemitosTable from "./RemitosTable";
import { auth } from "../config/FirebaseConfig";


 const ListarRemitos = () => {
    const OBTENER_REMITOS = "/remitos";
    const navigate = useNavigate();
    const [remitos, setRemitos] = useState<any[]> ([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [remitoSeleccionado, setRemitoSeleccionado] = useState<any>(null);

useEffect(()=>{
    const obtenerRemitos = async () => {
        try{
            const response = await apiClient.get(OBTENER_REMITOS);
            setRemitos(response.data);
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
      if(!auth.currentUser){
        alert ("Usuario no autenticado");
        return;
      }
      const token = await auth.currentUser.getIdToken();
      await apiClient.delete(`/remitos/${remitoSeleccionado._id}`,{
        headers: {Authorization: `Bearer ${token}`,}
      });

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
        <button onClick={() => navigate("/remitos/nuevo")} className="btn-agregar">
          Agregar Remito
        </button>
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