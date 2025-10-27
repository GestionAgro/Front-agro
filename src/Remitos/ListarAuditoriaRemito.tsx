import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import AuditoriasRemitoTable from "./AuditoriaRemitoTable";
import type { AuditoriaFactura as AuditoriaRemito } from "../entidades/AuditoriaFactura"; // reutilizamos el tipo

const ListarAuditoriasRemito = () => {
  const [auditorias, setAuditorias] = useState<AuditoriaRemito[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const obtenerAuditorias = async () => {
      try {
        const response = await apiClient.get("/auditoriaRemito");
        setAuditorias(response.data);
      } catch (err) {
        setError("Error al obtener las auditorías de remitos");
      }
    };
    obtenerAuditorias();
  }, []);

  return (
    <div className="contenedor">
      <h1>Auditorías de Remitos</h1>
      {error && <p>{error}</p>}
      <AuditoriasRemitoTable rows={auditorias} />
    </div>
  );
};

export default ListarAuditoriasRemito;
