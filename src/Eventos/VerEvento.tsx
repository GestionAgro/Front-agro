import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import "../Facturas/css/Ver.css";
import { useParams } from "react-router-dom";
import { getEventoById } from "./EventoService";

interface ObjectViewerProps {
  data: any;
}

const ObjectViewer = ({ data }: ObjectViewerProps) => {
  if (data === null || data === undefined)
    return <span className="valor-vacio">-</span>;


  if (typeof data === "object" && data !== null && "nombre" in data) {
    return <span>{data.nombre}</span>;
  }

  if (typeof data !== "object") {
    const isEmpty = data === "-" || data === "";
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
            <span
              className={
                value === "-" || value === null || value === ""
                  ? "valor-vacio"
                  : ""
              }
            >
              {String(value)}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

const VerEvento = () => {
  const { id } = useParams<{ id: string }>();
  const [evento, setEvento] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const obtenerEvento = async () => {
    try {
       if (id) {
        const data = await getEventoById(id);
        setEvento(data);
      }
    } catch (err) {
      setError("Error al obtener el evento");
    }
  };

  useEffect(() => {
    if (id) obtenerEvento();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!evento) return <p>Cargando evento...</p>;

  return (
    <div className="ver-factura">
      <h2>Detalles del Evento</h2>
      <p>
        <strong>ID Evento:</strong> <span>{evento._id}</span>
      </p>
      <p>
        <strong>Tipo de operación:</strong>{" "}
        <span>{evento.tipo_operacion}</span>
      </p>
      <p>
        <strong>Entidad afectada:</strong>{" "}
        <span>{evento.entidad_afectada}</span>
      </p>
      <p>
        <strong>Fecha y hora:</strong>{" "}
        <span>{new Date(evento.fechaYhora).toLocaleString("es-AR")}</span>
      </p>

      <p>
        <strong>Descripción:</strong> <span>{evento.descripcion}</span>
      </p>
      <p>
  <strong>Persona que realizo la accion:</strong> <span>{evento.nombre}</span>
</p>


    </div>
  );
};

export default VerEvento;