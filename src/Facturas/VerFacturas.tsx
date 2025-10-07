import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import type { Factura } from "../entidades/Factura";
import "./css/Ver.css";
import { useParams } from "react-router-dom";

const VerFactura = () => {
  const { id } = useParams<{ id: string }>();
  const [factura, setFactura] = useState<Factura | null>(null);
  const [error, setError] = useState<string>("");


  const obtenerFactura = async () => {
    try {
      const response = await apiClient.get<Factura>(`/facturas/${id}`);
      setFactura(response.data);
    } catch (err) {
      setError("Error al obtener la factura");
    }
  };

  useEffect(() => {
    obtenerFactura();
  }, [id]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!factura) {
    return <p>Cargando factura...</p>;
  }

  return (
    <div className="ver-factura">
  <h2>Factura Nº {factura.numero_factura}</h2>
  <p><strong>Tipo:</strong> <span>{factura.tipo_factura}</span></p>
  <p><strong>Empresa:</strong> <span>{factura.empresa}</span></p>
  <p><strong>Importe:</strong> <span>${factura.importe}</span></p>
  <p><strong>Estado:</strong> <span>{factura.estado}</span></p>
  <p><strong>Numero de remito asociado:</strong> <span>{factura.numero_remito}</span></p>
  {typeof factura.recibido_por === "string" ? (
    <p>
      <strong>Recibido por:</strong>{" "}
      <span>{factura.recibido_por}</span>
    </p>
  ) : (
    <p>
      <strong>Recibido por:</strong>{" "}
      <span>{factura.recibido_por?.nombre ?? "No asignado"}</span>
    </p>
  )}
</div>
  );
};

export default VerFactura;
