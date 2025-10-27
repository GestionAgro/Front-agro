import React from "react";
import type { Persona } from "../entidades/Persona";

interface Props {
  persona: Persona;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FormularioEditarPersona: React.FC<Props> = ({ persona, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form-factura">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={persona.nombre}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tipo de Persona</label>
        <select
          name="tipo_persona"
          value={persona.tipo_persona}
          onChange={onChange}
          className="form-control"
        >
          <option value="ENCARGADO">Encargado</option>
          <option value="VETERINARIO">Veterinario</option>
          <option value="EMPLEADO">Empleado</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Guardar cambios
      </button>
    </form>
  );
};

export default FormularioEditarPersona;
