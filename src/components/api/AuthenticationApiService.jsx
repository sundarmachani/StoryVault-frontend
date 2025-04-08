import { apiClient } from "./ApiClient.jsx";

export const jwtAuthApiCall = (username, password) =>
  apiClient.post(`/authenticate`, {
    username,
    password,
  });
