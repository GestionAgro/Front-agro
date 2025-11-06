import apiClient from "../api/apiServer";
import type { Remito } from "../entidades/Remitos";
import { auth } from "../config/FirebaseConfig";
import type { AuditoriaRemito } from "../entidades/AuditoriaRemito";


export const getAllRemitos = async (): Promise<Remito[]> => {
  const response = await apiClient.get("/remitos");
  return response.data;
};

export const getRemitoById = async (id: string): Promise<Remito> => {
  const response = await apiClient.get(`/remitos/${id}`);
  return response.data;
};

export const addRemito = async (remito: Omit<Remito, "_id">) => {
  if (!auth.currentUser) throw new Error("Usuario no autenticado");
  const token = await auth.currentUser.getIdToken();
  const response = await apiClient.post("/remitos", remito, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateRemito = async (id: string, data: Partial<Remito>) => {
  if (!auth.currentUser) throw new Error("Usuario no autenticado");
  const token = await auth.currentUser.getIdToken();
  const response = await apiClient.put(`/remitos/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteRemito = async (id: string) => {
  if (!auth.currentUser) throw new Error("Usuario no autenticado");
  const token = await auth.currentUser.getIdToken();
  await apiClient.delete(`/remitos/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getAllAuditoriasRemito = async (): Promise<AuditoriaRemito[]> => {
  const res = await apiClient.get("/auditoriaRemito");
  return res.data;
};

export const getAuditoriaRemitoById = async (id: string): Promise<AuditoriaRemito> => {
  const res = await apiClient.get(`/auditoriaRemito/${id}`);
  return res.data;
};

export const getReporteMensualRemitos = async () => {
  const res = await apiClient.get("/remitos/reporte/mensual");
  return res.data;
};