import apiClient from "../api/apiServer";
import type { Remito } from "../entidades/Remitos";
import { auth } from "../config/FirebaseConfig";
import type { AuditoriaRemito } from "../entidades/AuditoriaRemito";

const getAuthHeader = async () => {
  if (!auth.currentUser) throw new Error("Usuario no autenticado");
  const token = await auth.currentUser.getIdToken();
  return { Authorization: `Bearer ${token}` };
};

export const getAllRemitos = async (): Promise<Remito[]> => {
  const res = await apiClient.get("/remitos");
  return res.data;
};

export const getRemitoById = async (id: string): Promise<Remito> => {
  const res = await apiClient.get(`/remitos/${id}`);
  return res.data;
};


export const updateRemito = async (id: string, data: Partial<Remito>) => {
  const headers = await getAuthHeader();
  await apiClient.put(`/remitos/${id}`, data, { headers });
};

export const deleteRemito = async (id: string) => {
  const headers = await getAuthHeader();
  await apiClient.delete(`/remitos/${id}`, { headers });
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