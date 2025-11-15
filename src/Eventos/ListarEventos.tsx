import { useEffect, useState } from "react";
import EventosTable from "./EventosTable";
import type { Evento } from "../entidades/Evento";
import { getAllEventos } from "./EventoService";
import Modal from "../componentes/Modal";

const ListarEventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const data = await getAllEventos();
        setEventos(data);
      } catch {
        setMensaje("Error al obtener los eventos");
        setModalError(true);
      }
    };
    obtenerEventos();
  }, []);

  return (
    <div className="contenedor">
      <h1>Eventos del Sistema</h1>
      <EventosTable rows={eventos} />
      <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <p>{mensaje}</p>
      </Modal>
    </div>
  );
};

export default ListarEventos;
