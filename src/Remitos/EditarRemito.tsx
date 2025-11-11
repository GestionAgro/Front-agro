import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/apiServer";
import type { Remito } from "../entidades/Remitos";
import FormularioEditarRemito from "./FormularioEditarRemito";
import { auth } from "../config/FirebaseConfig";
import { getRemitoById, updateRemito } from "./RemitoService";

const EditarRemito = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [remito, setRemito] = useState<Remito>({
    numero_remito: 0,
    fecha: new Date(),
    empresa: "",
    productos: [],
    recibido_por: { _id: "", nombre: "", tipo_persona: "ENCARGADO" },
    estado: "EN_ESPERA",
  });

  const [mensaje, setMensaje] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchRemito = async () => {
      try {
        const data = await getRemitoById(id!);
        setRemito(data);
      } catch (err) {
        console.error("Error al cargar remito:", err);
      }
    };

    fetchRemito();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRemito((prev) => ({
      ...prev,
      [name]: name === "fecha" ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!auth.currentUser) {
        setMensaje("Usuario no autenticado");
        setModalOpen(true);
        return;
      }
      await updateRemito(id!, {fecha: remito.fecha,empresa: remito.empresa,});

      navigate("/remitos");
    } catch (err) {
      console.error("Error al actualizar remito:", err);
      setMensaje("Error al actualizar remito");
      setModalOpen(true);
    }
  };

  return (
    <div className="contenedor-formulario">
      <FormularioEditarRemito remito={remito} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditarRemito;
