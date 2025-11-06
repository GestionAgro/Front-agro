import apiClient from "../api/apiServer";
import { auth } from "../config/FirebaseConfig";
import type { AuditoriaFactura } from "../entidades/AuditoriaFactura";
import type { Factura } from "../entidades/Factura";

const getAuthHeader = async () => {
  if (!auth.currentUser) throw new Error("Usuario no autenticado");
  const token = await auth.currentUser.getIdToken();
  return { Authorization: `Bearer ${token}` };
};

export const getAllFacturas = async (): Promise<Factura[]> => {
  const res = await apiClient.get("/facturas");
  return res.data;
};

export const getFacturaById = async (id: string): Promise<Factura> => {
  const res = await apiClient.get(`/facturas/${id}`);
  return res.data;
};

export const addFactura = async (factura: Omit<Factura, "_id">): Promise<void> => {
  const headers = await getAuthHeader();
  await apiClient.post("/facturas", factura, { headers });
};

export const updateFactura = async (id: string, factura: Factura): Promise<void> => {
  const headers = await getAuthHeader();
  await apiClient.put(`/facturas/${id}`, factura, { headers });
};

export const deleteFactura = async (id: string): Promise<void> => {
  const headers = await getAuthHeader();
  await apiClient.delete(`/facturas/${id}`, { headers });
};

export const asociarRemito = async (idFactura: string, numero_remito: number): Promise<void> => {
  const headers = await getAuthHeader();
  await apiClient.put(
    `/facturas/${idFactura}/asociar-remito`,
    { numero_remito, estado: "IMPUTADO" },
    { headers }
  );
};

export const getAllAuditoriasFactura = async (): Promise<AuditoriaFactura[]> => {
  const res = await apiClient.get("/auditoriaFactura");
  return res.data;
};

export const getAuditoriaFacturaById = async (id: string): Promise<AuditoriaFactura> => {
  const res = await apiClient.get(`/auditoriaFactura/${id}`);
  return res.data;
};

export const getTotalesPorMes = async () => {
  const res = await apiClient.get("/facturas/reporte/total-por-mes");
  return res.data;
};