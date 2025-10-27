import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import type { AuditoriaStock } from "../entidades/AuditoriaStock";
import "../Facturas/css/Ver.css";
import { useParams } from "react-router-dom";

const ObjectViewer = ({ data }: { data: any }) => {
  if (data === null || data === undefined) return <span className="valor-vacio">-</span>;
  if (typeof data !== "object"){
    const isEmpty = data === "-" || data === null || data === "";
    return <span className={isEmpty ? "valor-vacio" : ""}>{String(data)}</span>;
  }

  if (Array.isArray(data)) {
    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <ObjectViewer data={item} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul>
      {Object.entries(data).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong>{" "}
          {typeof value === "object" && value !== null ? (
            <ObjectViewer data={value} />
          ) : (
            <span className={value === "-" || value === null || value === "" ? "valor-vacio" : ""}>
              {typeof value === "string" &&
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
                ? new Date(value).toLocaleDateString("es-AR")
                : String(value)}
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
};

const VerAuditoriaStock = () => {
  const { id } = useParams<{ id: string }>();
  const [auditoria, setAuditoria] = useState<AuditoriaStock | null>(null);
  const [error, setError] = useState<string>("");

  const obtenerAuditoria = async () => {
    try {
      const response = await apiClient.get(`/auditoriaStock/${id}`);
      setAuditoria(response.data);
    } catch {
      setError("Error al obtener la auditoría");
    }
  };

  useEffect(() => {
    if (id) obtenerAuditoria();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!auditoria) return <p>Cargando auditoría...</p>;

  return (
    <div className="ver-factura">
      <h2>Auditoría de Stock</h2>
      <p>
        <strong>Stock ID:</strong> <span>{auditoria.id_stock}</span>
      </p>
      <p>
        <strong>Usuario:</strong> <span>{auditoria.nombre_usuario}</span>
      </p>
      <p>
        <strong>Campo Modificado:</strong> <span>{auditoria.campo_modificado}</span>
      </p>
      <p>
        <strong>Descripción:</strong> <span>{auditoria.descripcion}</span>
      </p>

      <p>
        <strong>Valor Anterior:</strong>
      </p>
      <ObjectViewer data={safeParse(auditoria.valor_anterior)} />

      <p>
        <strong>Valor Nuevo:</strong>
      </p>
      <ObjectViewer data={safeParse(auditoria.valor_nuevo)} />
    </div>
  );
};

export default VerAuditoriaStock;
