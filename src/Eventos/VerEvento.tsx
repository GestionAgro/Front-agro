import { useEffect, useState } from "react";
import "../Facturas/css/Ver.css";
import { useParams } from "react-router-dom";
import { getEventoById } from "./EventoService";
import Modal from "../componentes/Modal";

const VerEvento = () => {
  const { id } = useParams<{ id: string }>();
  const [evento, setEvento] = useState<any>(null);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const obtenerEvento = async () => {
    try {
      const data = await getEventoById(id!);
      setEvento(data);
    } catch {
      setMensaje("Error al obtener el evento");
      setModalError(true);
    }
  };

  useEffect(() => {
    if (id) obtenerEvento();
  }, [id]);


  if (!evento) return null;

  return (
    <>
    <div className="ver-factura">
      <h2>Detalles del Evento</h2>
      <p><strong>ID Evento:</strong> <span>{evento._id}</span></p>
      <p><strong>Tipo de operación:</strong>{" "}<span>{evento.tipo_operacion}</span></p>
      <p><strong>Entidad afectada:</strong>{" "}<span>{evento.entidad_afectada}</span></p>
      <p><strong>Fecha y hora:</strong>{" "}<span>{new Date(evento.fechaYhora).toLocaleString("es-AR")}</span></p>
      <p><strong>Descripción:</strong> <span>{evento.descripcion}</span></p>
      <p><strong>Persona que realizo la accion:</strong> <span>{evento.nombre}</span></p>
    </div>
     <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <p>{mensaje}</p>
      </Modal>
    </>
  );
};

export default VerEvento;