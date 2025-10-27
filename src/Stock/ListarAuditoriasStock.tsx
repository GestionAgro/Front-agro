import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import AuditoriasStockTable from "./AuditoriaStockTable";
import type { AuditoriaStock } from "../entidades/AuditoriaStock";

const ListarAuditoriasStock = () => {
  const [auditorias, setAuditorias] = useState<AuditoriaStock[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const obtenerAuditorias = async () => {
      try {
        const response = await apiClient.get("/auditoriaStock");
        setAuditorias(response.data);
      } catch (err) {
        setError("Error al obtener las auditorías de stock");
      }
    };
    obtenerAuditorias();
  }, []);

  return (
    <div className="contenedor">
      <h1>Auditorías de Stock</h1>
      {error && <p>{error}</p>}
      <AuditoriasStockTable rows={auditorias} />
    </div>
  );
};

export default ListarAuditoriasStock;
