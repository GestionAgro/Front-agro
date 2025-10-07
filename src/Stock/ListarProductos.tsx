import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import "../Remitos/css/ListaRemitos.css";
import Modal from "../componentes/Modal";
import { useNavigate } from "react-router-dom";
import type { Producto } from "../entidades/Producto";
import ProductosTable from "./ProductosTable";

const ListarProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string>("");
  const [modalEliminarOpen, setModalEliminarOpen] = useState(false);
  const [modalStockOpen, setModalStockOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [cantidadStock, setCantidadStock] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await apiClient.get("/producto");
        setProductos(response.data);
      } catch (err) {
        setError("Error al obtener los productos :(");
      }
    };
    obtenerProductos();
  }, []);

  const confirmarEliminar = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setModalEliminarOpen(true);
  };

    const abrirModalStock = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setCantidadStock(0);
    setModalStockOpen(true);
  };

  const eliminarProducto = async () => {
    try {
      await apiClient.delete(`/producto/${productoSeleccionado?._id}`);
      setProductos(productos.filter((p) => p._id !== productoSeleccionado?._id));
      setModalEliminarOpen(false);
    } catch (err) {
      alert("Error al eliminar el producto");
    }
  };


 const ajustarStock = async () => {
    if (!productoSeleccionado) return;
    try {
      const response = await apiClient.patch(`/producto/${productoSeleccionado._id}/ajustar`, {
        cantidad: -cantidadStock,
      });
      setProductos(
        productos.map((p) => (p._id === productoSeleccionado._id ? response.data : p))
      );
      setModalStockOpen(false);
    } catch (err: any) {
      alert("Error al ajustar stock: " + err.message);
    }
  };

  return (
    <div className="contenedor">
      <div className="header-remitos">
        <h1>Lista de Productos</h1>
      </div>
      {error && <p className="error">{error}</p>}
      <button
        onClick={() => navigate("/productos/nuevo")}
        className="btn-agregar"
      >
        Agregar Producto
      </button>

     <ProductosTable rows={productos} onDelete={confirmarEliminar} onAjustarStock={abrirModalStock} />

      {/*modal para eliminar*/}
      <Modal isOpen={modalEliminarOpen} onClose={() => setModalEliminarOpen(false)}>
        <h2>¿Eliminar producto?</h2>
        {productoSeleccionado && (
          <p>
            ¿Seguro que querés borrar el producto{" "}
            <strong>{productoSeleccionado.nombre_producto}</strong>?
          </p>
        )}
        <div className="modal-actions">
          <button onClick={() => setModalEliminarOpen(false)}>Cancelar</button>
          <button onClick={eliminarProducto}>Confirmar</button>
        </div>
      </Modal>

       {/*modal para ajustar el stcok manualemnte*/}
         <Modal isOpen={modalStockOpen} onClose={() => setModalStockOpen(false)}>
        <h2>Descontar stock de {productoSeleccionado?.nombre_producto}</h2>
        <input
          type="number"
          min={1}
          value={cantidadStock}
          onChange={(e) => setCantidadStock(Number(e.target.value))}
          placeholder="Cantidad a descontar"
        />
        <div className="modal-actions">
          <button onClick={() => setModalStockOpen(false)}>Cancelar</button>
          <button onClick={ajustarStock}>Descontar</button>
        </div>
      </Modal>
    </div>
  );
};

export default ListarProductos;
