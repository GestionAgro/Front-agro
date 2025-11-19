import { useEffect, useState } from "react";
import type { AuditoriaStock } from "../entidades/AuditoriaStock";
import "../Facturas/css/Ver.css";
import { useParams } from "react-router-dom";
import { getAuditoriaStockById } from "./ProductoService";
import ObjectViewer, { safeParse } from "../componentes/ObjectViewer";
import Modal from "../componentes/Modal";

const VerAuditoriaStock = () => {
  const { id } = useParams<{ id: string }>();
  const [auditoria, setAuditoria] = useState<AuditoriaStock | null>(null);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");


useEffect(() => {
  const obtenerAuditoria = async () => {
    try {
      if(!id) return;
      const data = await getAuditoriaStockById(id);
      setAuditoria(data);
    } catch {
      setMensaje("Error al obtener la auditoría");
      setModalError(true);
    }
  };

  obtenerAuditoria();
  }, [id]);


  if (!auditoria) return null;

  return (
    <>
    <div className="ver-factura">
      <h2>Auditoría de Stock</h2>
      <p><strong>Stock ID:</strong> <span>{auditoria.id_stock}</span></p>
      <p><strong>Usuario:</strong> <span>{auditoria.nombre_usuario}</span></p>
      <p><strong>Campo Modificado:</strong> <span>{auditoria.campo_modificado}</span></p>
      <p><strong>Descripción:</strong> <span>{auditoria.descripcion}</span></p>

      <p><strong>Valor Anterior:</strong></p>
      <ObjectViewer data={safeParse(auditoria.valor_anterior)} />

      <p><strong>Valor Nuevo:</strong></p>
      <ObjectViewer data={safeParse(auditoria.valor_nuevo)} />
    </div>

    <Modal isOpen={modalError} onClose={() => setModalError(false)}>
    <p>{mensaje}</p>
  </Modal>
  </>
  );
};

export default VerAuditoriaStock;
