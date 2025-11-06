import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import AuditoriasFacturaTable from "./AuditoriasFacturaTable";
import type { AuditoriaFactura } from "../entidades/AuditoriaFactura";
import { getAllAuditoriasFactura } from "./FacturaService";

const ListarAuditorias = () => {
  const [auditorias, setAuditorias] = useState<AuditoriaFactura[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const obtenerAuditorias = async () => {
      try {
        const data = await getAllAuditoriasFactura();
        setAuditorias(data);
      } catch (err) {
        setError("Error al obtener las auditorías");
      }
    };
    obtenerAuditorias();
  }, []);

  return (
    <div className="contenedor">
      <h1>Auditorías de Facturas</h1>
      {error && <p>{error}</p>}
      <AuditoriasFacturaTable rows={auditorias} />
    </div>
  );
};

export default ListarAuditorias;
