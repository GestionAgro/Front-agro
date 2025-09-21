import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import "./ListaRemitos.css";
import { useNavigate } from "react-router-dom";
import Modal from "../componentes/Modal";


 const ListarRemitos = () => {
    const OBTENER_REMITOS = "/remitos";
    const navigate = useNavigate();
    const [remitos, setRemitos] = useState<any[]> ([]);
    const [error, setError] = useState<String>("");
    const [fechaFiltro, setFechaFiltro] = useState<string>("");
    const [modalOpen, setModalOpen] = useState(false);
    const [remitoSeleccionado, setRemitoSeleccionado] = useState<any>(null);

useEffect(()=>{
    const obtenerRemitos = async () => {
        try{
            const response = await apiClient.get(OBTENER_REMITOS);
            setRemitos(response.data);
        } catch (err:any){
            setError("error al obteenr los remitos :(");
        }
    };
    obtenerRemitos();
}, []);

   const remitosFiltrados = fechaFiltro
    ? remitos.filter(
        (r) => new Date(r.fecha).toLocaleDateString() === new Date(fechaFiltro).toLocaleDateString()
      )
    : remitos;

     const confirmarEliminar = (remito: any) => {
    setRemitoSeleccionado(remito);
    setModalOpen(true);
  };

  const eliminarRemito = async () => {
    try {
      await apiClient.delete(`/remitos/${remitoSeleccionado._id}`);
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
      </div>
      {error && <p className="error">{error}</p>}

      <div className="filtro-boton-container">
        <input
          type="date"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
        <button
          onClick={() => navigate("/remitos/nuevo")}
          className="btn-agregar"
        >
          Agregar Remito
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Fecha</th>
            <th>Empresa</th>
            <th>Detalle</th>
            <th>Recibido por</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {remitosFiltrados.map((remito) => (
            <tr key={remito._id}>
              <td>{remito.numero_remito}</td>
              <td>{new Date(remito.fecha).toLocaleDateString()}</td>
              <td>{remito.empresa}</td>
              <td>{remito.detalle}</td>
              <td>{remito.recibido_por?.nombre || "Sin asignar"}</td>
              <td>
                {remito.estado === "EN_ESPERA"? "En espera": remito.estado === "FACTURADO"? "Facturado" : remito.estado}
              </td>
              <td>
                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => confirmarEliminar(remito)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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