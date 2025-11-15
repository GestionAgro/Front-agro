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
    productos: [] as { nombre_producto: string; cantidad: number; unidad: string }[],
    recibido_por: "",
    estado: "PENDIENTE",
  });

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    cantidad: 0,
    unidad: "",
  });

  const navigate = useNavigate();
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [personas, setPersonas] = useState<Persona[]>([]);


  useEffect(() => {
    const fetchPersonas = async () => {
      try{
      const data = await getAllPersonas();
      setPersonas(data);
    } catch {
      setMensaje("Error al cargar las personas");
      setModalError(true);
      setTimeout(() => setModalError(false), 2000);
      }
    }
    fetchPersonas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


 const handleProductoChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {const { name, value } = e.target;
  setNuevoProducto({...nuevoProducto,[name]: value,});
};

  const agregarProducto = () => {
    if (!nuevoProducto.nombre_producto || nuevoProducto.cantidad <= 0 || !nuevoProducto.unidad) return;
    setForm({
      ...form,
      productos: [...form.productos,
        {...nuevoProducto,
          cantidad: Number(nuevoProducto.cantidad)
    }],
    });
    setNuevoProducto({ nombre_producto: "", cantidad: 0, unidad: ""});
  };

  const eliminarProducto = (index: number) => {
    const nuevos = form.productos.filter((_, i) => i !== index);
    setForm({ ...form, productos: nuevos });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hoy = new Date();
    const fechaRemito = new Date(form.fecha);
    if (fechaRemito > hoy) {
    setMensaje("Error: la fecha no puede ser futura");
    setModalError(true);
    return;
  }

    try {
      if(!auth.currentUser){
        setMensaje("usuario no autenticado");
        setModalError(true);
        return;
      }
      const token = await auth.currentUser.getIdToken();
      await apiClient.post("/remitos", form,{
        headers:{Authorization: `Bearer ${token}`},
      });

      setMensaje("Remito agregado con éxito");
      setModalError(true);

      setTimeout(() => {
        setModalError(false);
        navigate("/remitos");
      }, 1500);

    } catch (err: any) {

      if (err.response?.status === 400) {
      setMensaje("Error: el número de remito ya está registrado");
      }else{
        setMensaje("Error al crear el remito")
      }

      setModalError(true);
      setTimeout(() => setModalError(false), 2000);
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
            <select
            name="unidad"
            value={nuevoProducto.unidad}
            onChange={handleProductoChange}
            >
              <option value="">Unidad</option>
              <option value="kg">kg</option>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="unidades">unidades</option>

            </select>

            <button type="button" onClick={agregarProducto}>
              Agregar producto
            </button>
          </div>

          <ul>
            {form.productos.map((p, index) => (
              <li key={index}>
                {p.nombre_producto} — {p.cantidad} {p.unidad}{" "}
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

        <input type="hidden" name="estado" value="PENDIENTE" />

        <button type="submit" className="btn-agregar">Guardar</button>
      </form>

      <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <p>{mensaje}</p>
        </Modal>
    </div>
  );
};

export default AgregarRemito;


