import apiClient from "../api/apiServer";
import type { Persona } from "../entidades/Persona";

export const getPersonaById = async (id: string) => {
  const res = await apiClient.get(`/personas/${id}`);
  return res.data;
};

export const updatePersona = async (id: string, persona: Persona) => {
  const res = await apiClient.put(`/personas/${id}`, persona);
  return res.data;
};

export const createPersona = async (persona: Persona) => {
  const res = await apiClient.post(`/personas`, persona);
  return res.data;
};

export const deletePersona = async (id: string) => {
  const res = await apiClient.delete(`/personas/${id}`);
  return res.data;
};

export const getAllPersonas = async () => {
  const res = await apiClient.get(`/personas`);
  return res.data;
};