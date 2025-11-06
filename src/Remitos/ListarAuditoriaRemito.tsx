import { useEffect, useState } from "react";
import AuditoriasRemitoTable from "./AuditoriaRemitoTable";
import type { AuditoriaRemito } from "../entidades/AuditoriaRemito";
import { getAllAuditoriasRemito } from "./RemitoService";

const ListarAuditoriasRemito = () => {
  const [auditorias, setAuditorias] = useState<AuditoriaRemito[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const obtenerAuditorias = async () => {
      try {
        const data = await getAllAuditoriasRemito();
        setAuditorias(data);
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
