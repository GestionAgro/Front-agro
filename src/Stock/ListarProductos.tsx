import { useEffect, useState } from "react";
import "../Remitos/css/ListaRemitos.css";
import Modal from "../componentes/Modal";
import { useNavigate } from "react-router-dom";
import type { Producto } from "../entidades/Producto";
import ProductosTable from "./ProductosTable";
import { useAuth } from "../componentes/AuthContex";
import type { Persona } from "../entidades/Persona";
import { ajustarStockProducto, deleteProducto, getAllProductos } from "./ProductoService";
import { getAllPersonas } from "../personas/PersonaService";

const ListarProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string>("");
  const [modalEliminarOpen, setModalEliminarOpen] = useState(false);
  const [modalStockOpen, setModalStockOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [cantidadStock, setCantidadStock] = useState<number>(0);
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [personaSeleccionada, setPersonaSeleccionada] = useState<string>("");


  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const data = await getAllProductos();
        setProductos( data);
      } catch (err) {
        setError("Error al obtener los productos :(");
      }
    };
    obtenerProductos();
  }, []);

  useEffect(() => {
  const obtenerPersonas = async () => {
    try {
      const data = await getAllPersonas();
      setPersonas(data);
    } catch (err) {
      console.error("Error al obtener personas");
    }
  };

  obtenerPersonas();
}, []);

  const confirmarEliminar = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setModalEliminarOpen(true);
  };

    const abrirModalStock = (producto: Producto) => {
    setProductoSeleccionado(producto);
    setCantidadStock(0);
    setPersonaSeleccionada("");
    setModalStockOpen(true);
  };

  const eliminarProducto = async () => {
    try {
      if(productoSeleccionado?._id){
      await deleteProducto(productoSeleccionado?._id);
      setProductos(productos.filter((p) => p._id !== productoSeleccionado?._id));
      setModalEliminarOpen(false);
      }
    } catch (err) {
      alert("Error al eliminar el producto");
    }
  };


 const ajustarStock = async () => {
    if (!productoSeleccionado || !personaSeleccionada) {
    alert("Seleccioná quién retira el producto");
    return;
  }
    try {
      const actualizado = await ajustarStockProducto(productoSeleccionado._id!,cantidadStock,personaSeleccionada);
      setProductos(
        productos.map((p) => (p._id === productoSeleccionado._id ? actualizado : p))
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
      <div className="filtro-boton-container">
      {hasPermission("crear") && (
      <button onClick={() => navigate("/productos/nuevo")}className="btn-agregar"> Agregar Producto
      </button>
      )}
      </div>

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
        <div className="campo-empleado">
        <select
          value={personaSeleccionada}
          onChange={(e)=> setPersonaSeleccionada(e.target.value)}
          >
            <option value="">Seleccioná quién retira el producto</option>
            {personas.map((p) => (
              <option key={p._id} value={p._id}>
                {p.nombre}
              </option>
            ))}
        </select>
        </div>

      </Modal>
    </div>
  );
};

export default ListarProductos;
