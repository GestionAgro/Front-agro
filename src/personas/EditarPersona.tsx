import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/apiServer";
import type { Persona } from "../entidades/Persona";
import FormularioEditarPersona from "./FormularioEditarPersona";
import { getPersonaById, updatePersona } from "./PersonaService";

const EditarPersona = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [persona, setPersona] = useState<Persona>({
    nombre: "",
    tipo_persona: "ENCARGADO",
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        if(id){
        const data = await getPersonaById(id);
        setPersona(data);
        }
      } catch (err) {
        console.error("Error cargando persona:", err);
        setMensaje("Error al cargar la persona");
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
    } catch (err) {
      console.error("Error actualizando empleado:", err);
      setMensaje("Error actualizando empleado");
    }
  };

  return (
    <div className="contenedor-formulario">
      <h2>Editar Empleado</h2>

      <FormularioEditarPersona
        persona={persona}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      {mensaje && <p className="text-danger mt-3">{mensaje}</p>}
    </div>
  );
};

export default EditarPersona;
