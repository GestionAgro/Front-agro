import apiClient from "../api/apiServer";
import type { Evento } from "../entidades/Evento";

export const getAllEventos = async (): Promise<Evento[]> => {
  const res = await apiClient.get("/eventos");
  return res.data;
};

export const getEventoById = async (id: string): Promise<Evento> => {
  const res = await apiClient.get(`/eventos/${id}`);
  return res.data;
};
