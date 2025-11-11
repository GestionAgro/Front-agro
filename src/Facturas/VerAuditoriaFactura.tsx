import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import type { AuditoriaFactura } from "../entidades/AuditoriaFactura";
import "./css/VerAuditori.css";
import { useParams } from "react-router-dom";
import { getAuditoriaFacturaById } from "./FacturaService";


const formatKey = (key: string) => {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
};


const ObjectViewer = ({ data }: { data: any }) => {
  if (data === null || data === undefined) return <span className="valor-vacio">-</span>;
  if (typeof data !== "object"){
    const isEmpty = data === "-" || data === null || data === "";
    return <span className={isEmpty ? "valor-vacio" : ""}>{String(data)}</span>;
  }

  return (
    <ul>
      {Object.entries(data).map(([key, value]) => (
        <li key={key}>
          <strong>{formatKey(key)}:</strong>
          {typeof value === "object" && value !== null ? (
            <ObjectViewer data={value} />
          ) : (
            <span className={value === "-" || value === null || value === "" ? "valor-vacio" : ""}>
              {String(value)}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};


const safeParse = (value: any) => {
  if (!value) return null;
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }
  return value;
}

const VerAuditoriaFactura = () => {
  const { id } = useParams<{ id: string }>();
  const [auditoria, setAuditoria] = useState<AuditoriaFactura | null>(null);
  const [error, setError] = useState<string>("");

  const obtenerAuditoria = async () => {
    try {
      const data = await getAuditoriaFacturaById(id!);
      setAuditoria(data);
    } catch (err) {
      setError("Error al obtener la auditoría");
    }
  };

  useEffect(() => {
    if (id) {
      obtenerAuditoria();
    }
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!auditoria) return null;

  return (
    <div className="ver-factura">
      <h2>Auditoría de Factura</h2>
      <p><strong>Numero Factura:</strong> <span>{auditoria.numero_factura}</span></p>
      <p><strong>Usuario:</strong> <span>{auditoria.nombre_usuario}</span></p>
      <p><strong>Campo Modificado:</strong> <span>{auditoria.campo_modificado}</span></p>
      <p><strong>Descripción:</strong> <span>{auditoria.descripcion}</span></p>

      <p><strong>Valor Anterior:</strong></p>
      <ObjectViewer data={safeParse(auditoria.valor_anterior)} />

      <p><strong>Valor Nuevo:</strong></p>
      <ObjectViewer data={safeParse(auditoria.valor_nuevo)} />
    </div>
  );
};

export default VerAuditoriaFactura;
