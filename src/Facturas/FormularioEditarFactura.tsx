import React from "react";
import type { Factura } from "../entidades/Factura";
import  "./css/Editar.css"

interface Props {
  factura: Factura;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onPersonaChange: (personaId: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FormularioEditarFactura: React.FC<Props> = ({factura,onChange, onPersonaChange,onSubmit,}) => {
  return (
    <form onSubmit={onSubmit} className="form-factura">
      <div className="mb-3">
        <label className="form-label">Número de Factura</label>
        <input
          type="number"
          name="numero_factura"
          value={factura.numero_factura}
          onChange={onChange}
          className="form-control"
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Número de Remito</label>
        <input
          type="number"
          name="numero_remito"
          value={factura.numero_remito}
          onChange={onChange}
          className="form-control"
          disabled
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo de Factura</label>
        <select
          name="tipo_factura"
          value={factura.tipo_factura}
          onChange={onChange}
          className="form-select"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Empresa</label>
        <input
          type="text"
          name="empresa"
          value={factura.empresa}
          onChange={onChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Importe</label>
        <input
          type="number"
          name="importe"
          value={factura.importe}
          onChange={onChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Estado</label>
        <select
          name="estado"
          value={factura.estado}
          onChange={onChange}
          disabled
          className="form-select"
        >
          <option value="PENDIENTE">Pendiente</option>
          <option value="IMPUTADA">Imputada</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Recibido por</label>
        <input
          type="text"
          value={factura.recibido_por?.nombre|| ""}
          onChange={(e) => onPersonaChange(e.target.value)}
          disabled
          className="form-control"

        />
      </div>

      <button type="submit" className="btn btn-primary">
        Guardar cambios
      </button>
    </form>
  );
};

export default FormularioEditarFactura;
