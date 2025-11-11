import React from "react";
import type { Remito } from "../entidades/Remitos";
import "../Facturas/css/Editar.css";

interface Props {
  remito: Remito;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FormularioEditarRemito: React.FC<Props> = ({ remito, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form-factura">
      <h2>Editar Remito</h2>
      <div className="mb-3">
        <label className="form-label">Número de Remito</label>
        <input
          type="number"
          name="numero_remito"
          value={remito.numero_remito}
          className="form-control"
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          name="fecha"
          value={new Date(remito.fecha).toISOString().split("T")[0]}
          onChange={onChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Empresa</label>
        <input
          type="text"
          name="empresa"
          value={remito.empresa}
          onChange={onChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Estado</label>
        <input type="text" value={remito.estado} className="form-control" disabled />
        </div>

      <div className="mb-3">
        <label className="form-label">Recibido por</label>
        <input
          type="text"
          value={
            typeof remito.recibido_por === "object"
              ? remito.recibido_por?.nombre || ""
              : remito.recibido_por
          }
          className="form-control"
          disabled
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Productos</label>
        <ul className="list-group">
          {remito.productos && remito.productos.length > 0 ? (
            remito.productos.map((p, index) => (
            <li
            key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{p.nombre_producto}</span>
          <span className="badge bg-secondary rounded-pill">
            {p.cantidad}
          </span>
        </li>
      ))
    ) : (
      <li className="list-group-item text-muted">Sin productos</li>
    )}
  </ul>
</div>


      <button type="submit" className="btn btn-primary">
        Guardar cambios
      </button>
    </form>
  );
};

export default FormularioEditarRemito;
