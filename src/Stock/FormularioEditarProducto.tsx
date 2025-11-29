import React from "react";
import type { Producto } from "../entidades/Producto";
import "../Facturas/css/Editar.css";

interface Props {
  producto: Producto;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FormularioEditarProducto: React.FC<Props> = ({ producto, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form-factura">
      <h2>Editar Producto</h2>
      <div className="mb-3">
        <label className="form-label">Nombre del Producto</label>
        <input
          type="text"
          name="nombre_producto"
          value={producto.nombre_producto}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Cantidad Actual</label>
        <input
          type="number"
          name="cantidad_actual"
          value={producto.cantidad_actual}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
      <label className="form-label">Unidad</label>
      <select
        name="unidad"
        value={producto.unidad}
        onChange={onChange}
        className="form-control"
        required
       >
        <option value="">Seleccionar unidad</option>
        <option value="kg">kg</option>
        <option value="L">L</option>
        <option value="ml">ml</option>
        <option value="unidades">unidades</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Guardar cambios
      </button>
    </form>
  );
};

export default FormularioEditarProducto;
