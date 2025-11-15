import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Producto } from "../entidades/Producto";
import FormularioEditarProducto from "./FormularioEditarProducto";
import { auth } from "../config/FirebaseConfig";
import { getProductoById, updateProducto } from "./ProductoService";
import Modal from "../componentes/Modal";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState<Producto>({
    nombre_producto: "",
    cantidad_actual: 0,
  });

  const [mensaje, setMensaje] = useState("");
  const [modalError, setModalError] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await getProductoById(id!);
        setProducto(data);
      } catch {
        setMensaje("Error cargando producto:");
        setModalError(true);
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
        setModalError(true);
        return;
      }
      await updateProducto(id!, producto);
      navigate("/productos");
    }
     catch {
      setMensaje("Error al actualizar el producto");
      setModalError(true);
    }
  };

  return (
    <>
    <div className="contenedor-formulario">
      <FormularioEditarProducto
        producto={producto}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>

    <Modal isOpen={modalError} onClose={() => setModalError(false)}>
    <p>{mensaje}</p>
  </Modal>
    </>
  );
};

export default EditarProducto;
