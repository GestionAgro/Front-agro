import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Producto } from "../entidades/Producto";
import FormularioEditarProducto from "./FormularioEditarProducto";
import { auth } from "../config/FirebaseConfig";
import { getProductoById, updateProducto } from "./ProductoService";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState<Producto>({
    nombre_producto: "",
    cantidad_actual: 0,
  });

  const [mensaje, setMensaje] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await getProductoById(id!);
        setProducto(data);
      } catch (err) {
        console.error("Error cargando producto:", err);
      }
    };

    fetchProducto();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: name === "cantidad_actual" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!auth.currentUser) {
        setMensaje("Usuario no autenticado");
        setModalOpen(true);
        return;
      }
      await updateProducto(id!, producto);
      navigate("/productos");
    }
     catch (err) {
      console.error("Error actualizando producto:", err);
      setMensaje("Error al actualizar el producto");
      setModalOpen(true);
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2>Editar Producto</h2>
      <FormularioEditarProducto
        producto={producto}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditarProducto;
