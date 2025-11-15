import { useEffect, useState } from "react";
import AuditoriasStockTable from "./AuditoriaStockTable";
import type { AuditoriaStock } from "../entidades/AuditoriaStock";
import { getAllAuditoriasStock } from "./ProductoService";
import Modal from "../componentes/Modal";

const ListarAuditoriasStock = () => {
  const [auditorias, setAuditorias] = useState<AuditoriaStock[]>([]);
  const [modalError, setModalError] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const obtenerAuditorias = async () => {
      try {
        const data = await getAllAuditoriasStock();
        setAuditorias(data);
      } catch (err) {
        setMensaje("Error al obtener las auditorías de stock");
        setModalError(true);
      }
    };
    obtenerAuditorias();
  }, []);

  return (
    <div className="contenedor">
      <h1>Auditorías de Stock</h1>
      <AuditoriasStockTable rows={auditorias} />
      <Modal isOpen={modalError} onClose={() => setModalError(false)}>
        <p>{mensaje}</p>
      </Modal>
    </div>
  );
};

export default ListarAuditoriasStock;
