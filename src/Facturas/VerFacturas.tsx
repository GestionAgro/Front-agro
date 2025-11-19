import { useEffect, useState } from "react";
import type { Factura } from "../entidades/Factura";
import "./css/Ver.css";
import { useParams } from "react-router-dom";
import { getFacturaById } from "./FacturaService";
import Modal from "../componentes/Modal";

const VerFactura = () => {
  const { id } = useParams<{ id: string }>();
  const [factura, setFactura] = useState<Factura | null>(null);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");


useEffect(() => {
  const obtenerFactura = async () => {
    try {
      const data = await getFacturaById(id!)
      setFactura(data);
    } catch (err) {
      setMensaje("Error al obtener la factura");
      setModalError(true);
    }
  };

    obtenerFactura();
  }, [id]);


  if (!factura) return null;

  return (
    <>
  <div className="ver-factura">
    <h2>Factura Nº {factura.numero_factura}</h2>
    <p><strong>Tipo:</strong> <span>{factura.tipo_factura}</span></p>
    <p><strong>Empresa:</strong> <span>{factura.empresa}</span></p>
    <p><strong>Importe:</strong> <span>${factura.importe}</span></p>
    <p><strong>Estado:</strong> <span>{factura.estado ? factura.estado.toLowerCase().replace("_", " ") : ""}</span></p>
    <p><strong>Fecha:</strong> <span>{new Date(factura.fecha).toLocaleDateString()}</span></p>
    <p><strong>Numero de remito asociado:</strong> <span>{factura.numero_remito}</span></p>

    <p>
      <strong>Recibido por:</strong>{" "}
      <span>
        {typeof factura.recibido_por === "string"
        ? factura.recibido_por
        : factura.recibido_por?.nombre ?? "No asignado"}
        </span>
    </p>
  </div>
  <Modal isOpen={modalError} onClose={() => setModalError(false)}>
    <p>{mensaje}</p>
  </Modal>
  </>
  );
};

export default VerFactura;
