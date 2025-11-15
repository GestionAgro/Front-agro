import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Persona } from "../entidades/Persona";
import FormularioEditarPersona from "./FormularioEditarPersona";
import { getPersonaById, updatePersona } from "./PersonaService";
import Modal from "../componentes/Modal";

const EditarPersona = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [persona, setPersona] = useState<Persona>({
    nombre: "",
    tipo_persona: "ENCARGADO",
  });

  const [mensaje, setMensaje] = useState("");
  const [modalError, setModalError] = useState(false);

  useEffect(() => {
    if(!id)return;

    const fetchPersona = async () => {
      try {
        const data = await getPersonaById(id);
        setPersona(data);
      } catch {
        setMensaje("Error al cargar la persona");
        setModalError(true);
      }
    };

    fetchPersona();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersona((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
      await updatePersona(id,persona);
      navigate("/empleados");

      }
    } catch {
      setMensaje("Error actualizando empleado");
      setModalError(true);
    }
  };

  return (
    <>
    <div className="contenedor-formulario">
      <FormularioEditarPersona
        persona={persona}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>

    <Modal isOpen={modalError} onClose={() => setModalError(false)}>
      <p>{mensaje}</p>
  </Modal>
 </>
  );
};

export default EditarPersona;
