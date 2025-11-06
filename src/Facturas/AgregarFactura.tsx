import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiServer";
import "../Remitos/css/AgregarRemitos.css"
import Modal from "../componentes/Modal";
import type { Persona } from "../entidades/Persona";
import { auth } from "../config/FirebaseConfig";
import { getAllPersonas } from "../personas/PersonaService";

const AgregarFactura = () => {
  const [form, setForm] = useState({
    numero_factura: "",
    tipo_factura: "A",
    fecha: "",
    empresa: "",
    importe: "",
    recibido_por: "",
    estado: "PENDIENTE",
  });

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
  const fetchPersonas = async () => {
    try {
      const data = await getAllPersonas();
      setPersonas(data);
    } catch (err) {
      console.error("Error al traer personas", err);
    }
  };
  fetchPersonas();
}, []);


const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    if (!auth.currentUser) {
      setMensaje("Usuario no autenticado");
      setModalOpen(true);
      return;
    }

    const token = await auth.currentUser.getIdToken();

    await apiClient.post("/facturas", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMensaje("Factura agregada con éxito");
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);
      navigate("/facturas");
    }, 1500);
  } catch (err) {
    setMensaje("Error al crear la factura");
    setModalOpen(true);
    setTimeout(() => setModalOpen(false), 2000);
  }
};




  return (
    <div className="contenedor">
      <h1>Agregar Factura</h1>
      <form onSubmit={handleSubmit} className="form-remito">
        <input
          type="number"
          name="numero_factura"
          placeholder="Número de Factura"
          value={form.numero_factura}
          onChange={handleChange}
          required
        />
        <select name="tipo_factura" value={form.tipo_factura} onChange={handleChange}>
          <option value="A">Factura A</option>
          <option value="B">Factura B</option>
          <option value="C">Factura C</option>
        </select>
        <input
          type="text"
          name="empresa"
          placeholder="Empresa"
          value={form.empresa}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="importe"
          placeholder="Importe"
          value={form.importe}
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
        <select
        name="recibido_por"
        value={form.recibido_por}
        onChange={handleChange}
        required
      >
      <option value="">Selecciona una persona</option>
      {personas.map((p) => (
      <option key={p._id} value={p._id}>
      {p.nombre} ({p.tipo_persona})
      </option>
      ))}
       </select>
        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="PENDIENTE">Pendiente</option>
          <option value="IMPUTADA">Imputada</option>
        </select>

        <button type="submit" className="btn-agregar">Guardar</button>
      </form>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{mensaje}</p>
      </Modal>
    </div>
  );
};

export default AgregarFactura;
