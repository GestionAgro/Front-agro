import apiClient from "../api/apiServer";
import { auth } from "../config/FirebaseConfig";
import type { Usuario, Rol } from "../entidades/Usuario";

const getAuthHeader = async () => {
  if (!auth.currentUser) throw new Error("Usuario no autenticado");
  const token = await auth.currentUser.getIdToken();
  return { Authorization: `Bearer ${token}` };
};

export const getAllUsuarios = async (): Promise<Usuario[]> => {
  const res = await apiClient.get("/usuarios");
  return res.data;
};

export const changeUserRole = async (id: string, nuevoRol: Rol): Promise<void> => {
  const headers = await getAuthHeader();
  await apiClient.put(`/usuarios/rol/${id}`, { rol: nuevoRol }, { headers });
};
