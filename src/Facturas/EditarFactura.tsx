import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/apiServer";
import { type Factura } from "../entidades/Factura";
import FormularioEditarFactura from "./FormularioEditarFactura";
import { auth } from "../config/FirebaseConfig";
import { getFacturaById, updateFactura } from "./FacturaService";

const EditarFactura = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [factura, setFactura] = useState<Factura>({
    numero_remito: 0,
    numero_factura: 0,
    tipo_factura: "A",
    fecha: new Date(),
    empresa: "",
    importe: 0,
    recibido_por: {
        _id: "", nombre: "",
        tipo_persona: "ENCARGADO"
    },
    estado: "PENDIENTE",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const data = await getFacturaById(id!);
        setFactura(data);
      } catch (err) {
        console.error("Error al cargar factura:", err);
      }
    };

    fetchFactura();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFactura((prev) => ({
      ...prev,
      [name]: name === "importe" || name === "numero_factura" || name === "numero_remito"
        ? Number(value)
        : value,
    }));
  };

  const handlePersonaChange = (personaId: string) => {
    setFactura((prev) => ({
      ...prev,
      recibido_por: { _id: personaId, nombre: "", tipo_persona:"EMPLEADO" },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateFactura(id!,factura);
      navigate("/facturas");
    } catch (err) {
      console.error("Error al actualizar factura:", err);
    }
  };

  return (
    <div className="contenedor-formulario">
      <FormularioEditarFactura
        factura={factura}
        onChange={handleChange}
        onPersonaChange={handlePersonaChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditarFactura;
