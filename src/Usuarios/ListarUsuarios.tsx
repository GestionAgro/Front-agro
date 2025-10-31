import { useEffect, useState } from "react";
import apiClient from "../api/apiServer";
import type { Rol, Usuario } from "../entidades/Usuario";
import UsuariosTable from "./UsuarioTable";
import "../Remitos/css/ListaRemitos.css";
import { auth } from "../config/FirebaseConfig";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await apiClient.get("/usuarios");
        setUsuarios(res.data);
      } catch (err) {
        setError("Error al obtener los usuarios");
      }
    };
    obtenerUsuarios();
  }, []);

  const cambiarRol = async (id: string, nuevoRol: Rol) => {
  try {
    const token = await auth.currentUser?.getIdToken();

    await apiClient.put(`/usuarios/rol/${id}`,{ rol: nuevoRol },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUsuarios((prev) =>
      prev.map((u) => (u._id === id ? { ...u, rol: nuevoRol } : u))
    );
  }
  catch (err) {
    alert("Error al cambiar el rol");
  }
};

  return (
    <div className="contenedor">
      <div className="header-remitos">
        <h1>Gestión de Usuarios</h1>
      </div>
      {error && <p className="error">{error}</p>}
      <UsuariosTable rows={usuarios} onChangeRol={cambiarRol} />
    </div>
  );
};

export default ListarUsuarios;
