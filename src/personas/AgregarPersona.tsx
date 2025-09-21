import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiServer";
import "../Remitos/AgregarRemitos.css";
import Modal from "../componentes/Modal";

const AgregarEmpleado = () => {
  const [form, setForm] = useState({
    nombre: "",
    tipo_persona: "EMPLEADO",
  });

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/personas", form);
      setMensaje("Empleado agregado con éxito");
      setModalOpen(true);

      setTimeout(() => {
        setModalOpen(false);
        navigate("/empleados");
      }, 1500);
    } catch (err) {
      setMensaje("Error al agregar el empleado");
      setModalOpen(true);
      setTimeout(() => setModalOpen(false), 2000);
    }
  };

  return (
    <div className="contenedor">
      <h1>Agregar Empleado</h1>
      <form onSubmit={handleSubmit} className="form-remito">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del empleado"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <select name="tipo_persona" value={form.tipo_persona} onChange={handleChange}>
          <option value="ENCARGADO">Encargado</option>
          <option value="EMPLEADO">Empleado</option>
          <option value="VETERINARIO">Veterinario</option>
        </select>

        <button type="submit" className="btn-agregar">Guardar</button>
      </form>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{mensaje}</p>
      </Modal>
    </div>
  );
};

export default AgregarEmpleado;
