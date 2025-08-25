import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiServer";
import "./AgregarRemitos.css"
import Modal from "../componentes/Modal";

const AgregarRemito = () => {
  const [form, setForm] = useState({
    numero_remito: "",
    fecha: "",
    empresa: "",
    detalle: "",
    recibido_por: "",
    estado: "EN_ESPERA",
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
      await apiClient.post("/remitos", form);
      setMensaje("Remito agregado con éxito");
      setModalOpen(true);

      setTimeout(() => {
        setModalOpen(false);
        navigate("/remitos");
      }, 1500);
    } catch (err) {
      setMensaje("Error al crear el remito");
      setModalOpen(true);
      setTimeout(() => setModalOpen(false), 2000);
    }
  };
  return (
    <div className="contenedor">
      <h1>Agregar Remito</h1>
      <form onSubmit={handleSubmit} className="form-remito">
        <input
          type="number"
          name="numero_remito"
          placeholder="Número de Remito"
          value={form.numero_remito}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="empresa"
          placeholder="Empresa"
          value={form.empresa}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="detalle"
          placeholder="Detalle"
          value={form.detalle}
          onChange={handleChange}
        />
        <input
          type="text"
          name="recibido_por"
          placeholder="Recibido por"
          value={form.recibido_por}
          onChange={handleChange}
        />
        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="EN_ESPERA">En espera</option>
          <option value="FACTURADO">Facturado</option>
        </select>

        <button type="submit" className="btn-agregar">Guardar</button>
      </form>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{mensaje}</p>
      </Modal>
    </div>
  );
};

export default AgregarRemito;