import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Remitos/css/AgregarRemitos.css";
import Modal from "../componentes/Modal";
import { addProducto } from "./ProductoService";

const AgregarProducto = () => {
  const [form, setForm] = useState({
    nombre_producto: "",
    cantidad_actual: 0,
    unidad: "",
  });

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "cantidad_actual" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await addProducto(form);

    setMensaje("Producto agregado con éxito");
    setModalOpen(true);

    setTimeout(() => {
      setModalOpen(false);
      navigate("/productos");
    }, 1500);
  }
   catch (err: any) {
    if (err.response && err.response.status === 400) {
      setMensaje(" El producto ya existe. Usá 'ajustar stock'");
    } else {
      setMensaje("Error al agregar el producto");
    }
    setModalOpen(true);
    setTimeout(() => setModalOpen(false), 3000);
  }
};

  return (
    <div className="contenedor">
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit} className="form-remito">
        <input
          type="text"
          name="nombre_producto"
          placeholder="Nombre del producto"
          value={form.nombre_producto}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="cantidad_actual"
          placeholder="Cantidad inicial"
          value={form.cantidad_actual}
          onChange={handleChange}
          min="0"
          required
        />
        <select
          name="unidad"
          value={form.unidad}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona unidad</option>
          <option value="kg">kg</option>
          <option value="L">L</option>
          <option value="ml">ml</option>
          <option value="unidades">unidades</option>
        </select>

        <button type="submit" className="btn-agregar">Guardar</button>
      </form>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{mensaje}</p>
      </Modal>
    </div>
  );
};

export default AgregarProducto;
