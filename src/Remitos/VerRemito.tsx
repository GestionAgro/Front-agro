import { useEffect, useState } from "react";
import type { Remito } from "../entidades/Remitos";
import "../Facturas/css/Ver.css";
import { useParams } from "react-router-dom";
import { getRemitoById } from "./RemitoService";
import Modal from "../componentes/Modal";

const VerRemito = () => {
  const { id } = useParams<{ id: string }>();
  const [remito, setRemito] = useState<Remito | null>(null);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");;

useEffect(() => {
  const obtenerRemito = async () => {
    try {
      const data = await getRemitoById(id!);
      setRemito(data);
    } catch {
      setMensaje("Error al obtener el remito");
      setModalError(true);
    }
  };

    obtenerRemito();
  }, [id]);

  if (!remito) return null;

  return (
    <>
    <div className="ver-factura">
      <h2>Remito Nº {remito.numero_remito}</h2>
      <p><strong>Fecha:</strong> <span>{new Date(remito.fecha).toLocaleDateString()}</span></p>
      <p><strong>Empresa:</strong> <span>{remito.empresa}</span></p>
      <div className="campo">
      <strong>Productos:</strong>
      <ul className="productos-lista">
        {remito.productos?.map((p, index) =>(
          <li key={index} className="producto-item">
           {p.nombre_producto}  { p.cantidad}  {p.unidad}
          </li>
        ))}
      </ul>
      </div>
      <p><strong>Estado:</strong> <span>{remito.estado ? remito.estado.toLocaleLowerCase().replace("_", " ") : ""}</span></p>
      <p><strong>Recibido por: </strong>
      <span>{typeof remito.recibido_por === "string"
      ? remito.recibido_por
      : remito.recibido_por?.nombre ?? "Sin asignar"}
      </span>
    </p>
  </div>
  <Modal isOpen={modalError} onClose={() => setModalError(false)}>
    <p>{mensaje}</p>
  </Modal>
  </>
  );
};

export default VerRemito;
