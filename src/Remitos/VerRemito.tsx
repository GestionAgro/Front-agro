import { useEffect, useState } from "react";
import type { Remito } from "../entidades/Remitos";
import "../Facturas/css/Ver.css";
import { useParams } from "react-router-dom";
import { getRemitoById } from "./RemitoService";

const VerRemito = () => {
  const { id } = useParams<{ id: string }>();
  const [remito, setRemito] = useState<Remito | null>(null);
  const [error, setError] = useState<string>("");

  const obtenerRemito = async () => {
    try {
      const data = await getRemitoById(id!);
      setRemito(data);
    } catch (err) {
      setError("Error al obtener el remito");
    }
  };

  useEffect(() => {
    obtenerRemito();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!remito) return <p>Cargando remito...</p>;

  return (
    <div className="ver-factura">
      <h2>Remito Nº {remito.numero_remito}</h2>
      <p><strong>Fecha:</strong> <span>{new Date(remito.fecha).toLocaleDateString()}</span></p>
      <p><strong>Empresa:</strong> <span>{remito.empresa}</span></p>
      <div className="campo">
      <strong>Productos:</strong>
      <ul className="productos-lista">
        {remito.productos?.map((p, index) =>(
          <li key={index} className="producto-item">
           {p.nombre_producto}-{ p.cantidad}
          </li>
        ))}
      </ul>
      </div>
      <p><strong>Estado:</strong> <span>{remito.estado ? remito.estado.toLocaleLowerCase().replace("_", " ") : ""}</span></p>
      <p><strong>Recibido por: </strong>
      <span>{typeof remito.recibido_por === "string"
      ? remito.recibido_por
      : remito.recibido_por?.nombre ?? "Sin asignar"}
  </span>
</p>
  </div>
  );
};

export default VerRemito;
