import { useEffect, useState } from "react";
import type { AuditoriaRemito } from "../entidades/AuditoriaRemito";
import "../Facturas/css/Ver.css";
import { useParams } from "react-router-dom";
import { getAuditoriaRemitoById } from "./RemitoService";
import ObjectViewer, { safeParse } from "../componentes/ObjectViewer";
import Modal from "../componentes/Modal";

const VerAuditoriaRemito = () => {
  const { id } = useParams<{ id: string }>();
  const [auditoria, setAuditoria] = useState<AuditoriaRemito | null>(null);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const obtenerAuditoria = async () => {
    try {
      const data = await getAuditoriaRemitoById(id!);
      setAuditoria(data);
    } catch {
     setMensaje("Error al obtener la auditoría");
     setModalError(true);
    }
  };

  useEffect(() => {
    if (id) obtenerAuditoria();
  }, [id]);

  if (!auditoria) return null;

  return (
    <>
    <div className="ver-factura">
      <h2>Auditoría de Remito</h2>
      <p><strong>Numero Remito:</strong> <span>{auditoria.numero_remito}</span></p>
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

export default VerAuditoriaRemito;
