import { useEffect, useState } from "react";
import AuditoriasFacturaTable from "./AuditoriasFacturaTable";
import type { AuditoriaFactura } from "../entidades/AuditoriaFactura";
import { getAllAuditoriasFactura } from "./FacturaService";
import Modal from "../componentes/Modal";

const ListarAuditorias = () => {
  const [auditorias, setAuditorias] = useState<AuditoriaFactura[]>([]);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");


  useEffect(() => {
    const obtenerAuditorias = async () => {
      try {
        const data = await getAllAuditoriasFactura();
        setAuditorias(data);
      } catch (err) {
        setMensaje("Error al obtener las auditorías");
        setModalError(true);
      }
    };
    obtenerAuditorias();
  }, []);

  return (
    <div className="contenedor">
      <h1>Auditorías de Facturas</h1>
      <AuditoriasFacturaTable rows={auditorias} />
      <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <p>{mensaje}</p>
      </Modal>
    </div>
  );
};

export default ListarAuditorias;
