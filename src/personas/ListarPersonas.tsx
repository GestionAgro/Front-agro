import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import "../Remitos/css/ListaRemitos.css";
import Modal from "../componentes/Modal";
import { useNavigate } from "react-router-dom";
import type { Persona } from "../entidades/Persona";
import PersonasTable from "./PersonasTable";

const ListarEmpleados = () => {
  const [empleados, setEmpleados] = useState<Persona[]>([]);
  const [error, setError] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Persona | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerEmpleados = async () => {
      try {
        const response = await apiClient.get("/personas");
        setEmpleados(response.data);
      } catch (err) {
        setError("Error al obtener los empleados :(");
      }
    };
    obtenerEmpleados();
  }, []);

  const confirmarEliminar = (empleado: Persona) => {
    setEmpleadoSeleccionado(empleado);
    setModalOpen(true);
  };

  const eliminarEmpleado = async () => {
    try {
      await apiClient.delete(`/personas/${empleadoSeleccionado?._id}`);
      setEmpleados(empleados.filter((e) => e._id !== empleadoSeleccionado?._id));
      setModalOpen(false);
    } catch (err) {
      alert("Error al eliminar el empleado");
    }
  };

  return (
    <div className="contenedor">
      <div className="header-remitos">
        <h1>Lista de Empleados</h1>
      </div>
      {error && <p className="error">{error}</p>}
     <button
        onClick={() => navigate("/empleados/nuevo")}
        className="btn-agregar"
        style=padding-down
      >
        Agregar Empleado
      </button>

       <PersonasTable rows={empleados} onDelete={confirmarEliminar} />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>¿Eliminar empleado?</h2>
        {empleadoSeleccionado && (
          <p>
            ¿Seguro que querés borrar a {empleadoSeleccionado.nombre}?
          </p>
        )}
        <div className="modal-actions">
          <button onClick={() => setModalOpen(false)}>Cancelar</button>
          <button onClick={eliminarEmpleado}>Confirmar</button>
        </div>
      </Modal>
    </div>
  );
};

export default ListarEmpleados;
