import { apiClient } from "./ApiClient";

export const getAllEntriesFromApi = () => apiClient.get(`/get-all`);

export const createNewEntryApi = (diary) => apiClient.post(`/new-entry`, diary);

export const getEntryByIdApi = (id) => apiClient.get(`/get-entry/${id}`);

export const updateEntryApi = (diary) => apiClient.put(`/update-entry`, diary);

export const deleteEntryApi = (id) => apiClient.delete(`/delete-entry/${id}`);

export const registerUserApi = (username, password) =>
  apiClient.post(`/register`, { username, password });
