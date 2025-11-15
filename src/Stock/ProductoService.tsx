import apiClient from "../api/apiServer";
import { auth } from "../config/FirebaseConfig";
import type { AuditoriaStock } from "../entidades/AuditoriaStock";
import type { Producto } from "../entidades/Producto";

const getAuthHeader = async () => {
  if (!auth.currentUser) throw new Error("Usuario no autenticado");
  const token = await auth.currentUser.getIdToken();
  return { Authorization: `Bearer ${token}` };
};


export const getAllProductos = async (): Promise<Producto[]> => {
  const res = await apiClient.get("/producto");
  return res.data;
};


export const getProductoById = async (id: string): Promise<Producto> => {
  const res = await apiClient.get(`/producto/${id}`);
  return res.data;
};


export const addProducto = async (form: Omit<Producto, "_id">): Promise<void> => {
  const headers = await getAuthHeader();
  await apiClient.post("/producto", form, { headers });
};


export const updateProducto = async (id: string, producto: Omit<Producto, "_id">): Promise<void> => {
  const headers = await getAuthHeader();
  await apiClient.put(`/producto/${id}`, producto, { headers });
};


export const deleteProducto = async (id: string): Promise<void> => {
  const headers = await getAuthHeader();
  await apiClient.delete(`/producto/${id}`, { headers });
};


export const ajustarStockProducto = async (id: string,cantidad: number,id_persona_retiro: string): Promise<Producto> => {
  const headers = await getAuthHeader();
  const res = await apiClient.patch(`/producto/${id}/ajustar`,{ cantidad: -cantidad, id_persona_retiro },{ headers });
  return res.data;
};

export const getAllAuditoriasStock = async (): Promise<AuditoriaStock[]> => {
  const res = await apiClient.get("/auditoriaStock");
  return res.data;
};

export const getAuditoriaStockById = async (id: string): Promise<AuditoriaStock> => {
  const res = await apiClient.get(`/auditoriaStock/${id}`);
  return res.data;
}