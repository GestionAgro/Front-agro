import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiServer";
import "../Remitos/css/AgregarRemitos.css";
import Modal from "../componentes/Modal";
import type { Persona } from "../entidades/Persona";
import { auth } from "../config/FirebaseConfig";
import { getAllPersonas } from "../personas/PersonaService";

const AgregarRemito = () => {
  const [form, setForm] = useState({
    numero_remito: "",
    fecha: "",
    empresa: "",
    productos: [] as { nombre_producto: string; cantidad: number }[],
    recibido_por: "",
    estado: "EN_ESPERA",
  });

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    cantidad: 0,
  });

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [personas, setPersonas] = useState<Persona[]>([]);


  useEffect(() => {
    const fetchPersonas = async () => {
      const data = await getAllPersonas();
      setPersonas(data);
    };
    fetchPersonas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleProductoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const agregarProducto = () => {
    if (!nuevoProducto.nombre_producto || nuevoProducto.cantidad <= 0) return;
    setForm({
      ...form,
      productos: [...form.productos,
        {...nuevoProducto,
          cantidad: Number(nuevoProducto.cantidad)
    }],
    });
    setNuevoProducto({ nombre_producto: "", cantidad: 0 });
  };

  const eliminarProducto = (index: number) => {
    const nuevos = form.productos.filter((_, i) => i !== index);
    setForm({ ...form, productos: nuevos });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(!auth.currentUser){
        setMensaje("usuario no autenticado");
        setModalOpen(true);
        return;
      }
      const token = await auth.currentUser.getIdToken();
      await apiClient.post("/remitos", form,{
        headers:{Authorization: `Bearer ${token}`},
      });

      setMensaje("Remito agregado con éxito");
      setModalOpen(true);

      setTimeout(() => {
        setModalOpen(false);
        navigate("/remitos");
      }, 1500);
    } catch (err) {
      console.error(err);
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

        <div className="productos-section">
          <h3>Productos</h3>
          <div className="producto-inputs">
            <input
              type="text"
              name="nombre_producto"
              placeholder="Nombre del producto"
              value={nuevoProducto.nombre_producto}
              onChange={handleProductoChange}
            />
            <input
              type="number"
              name="cantidad"
              placeholder="Cantidad"
              value={nuevoProducto.cantidad}
              onChange={handleProductoChange}
            />
            <button type="button" onClick={agregarProducto}>
              Agregar producto
            </button>
          </div>

          <ul>
            {form.productos.map((p, index) => (
              <li key={index}>
                {p.nombre_producto} — {p.cantidad} unidades{" "}
                <button type="button" onClick={() => eliminarProducto(index)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

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
