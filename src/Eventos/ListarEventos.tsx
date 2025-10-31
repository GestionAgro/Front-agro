import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import EventosTable from "./EventosTable";
import type { Evento } from "../entidades/Evento";

const ListarEventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const response = await apiClient.get("/eventos");
        setEventos(response.data);
      } catch {
        setError("Error al obtener los eventos");
      }
    };
    obtenerEventos();
  }, []);

  return (
    <div className="contenedor">
      <h1>Eventos del Sistema</h1>
      {error && <p className="error">{error}</p>}
      <EventosTable rows={eventos} />
    </div>
  );
};

export default ListarEventos;
