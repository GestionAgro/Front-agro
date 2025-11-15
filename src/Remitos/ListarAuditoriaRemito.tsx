import { useEffect, useState } from "react";
import AuditoriasRemitoTable from "./AuditoriaRemitoTable";
import type { AuditoriaRemito } from "../entidades/AuditoriaRemito";
import { getAllAuditoriasRemito } from "./RemitoService";
import Modal from "../componentes/Modal";

const ListarAuditoriasRemito = () => {
  const [auditorias, setAuditorias] = useState<AuditoriaRemito[]>([]);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensajeError] = useState("");


  useEffect(() => {
    const obtenerAuditorias = async () => {
      try {
        const data = await getAllAuditoriasRemito();
        setAuditorias(data);
      } catch{
        setMensajeError("Error al obtener las auditorías de remitos");
        setModalError(true);
      }
    };
    obtenerAuditorias();
  }, []);

  return (
    <div className="contenedor">
      <h1>Auditorías de Remitos</h1>
      <AuditoriasRemitoTable rows={auditorias} />
     <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <p>{mensaje}</p>
      </Modal>
    </div>
  );
};

export default ListarAuditoriasRemito;
