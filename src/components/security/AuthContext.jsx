/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { jwtAuthApiCall } from "../api/AuthenticationApiService";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token.replace(/^Bearer\s+/, "")}`;
  }

  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  async function Login(username, password) {
    try {
      const response = await jwtAuthApiCall(username, password);
      if (response.status === 200) {
        const token = "Bearer " + response.data.token;
        setIsAuthenticated(true);
        setUsername(username);
        setToken(token);

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        return true;
      } else {
        Logout();
        return false;
      }
    } catch (error) {
      Logout();
      return false;
    }
  }

  function Logout() {
    setIsAuthenticated(false);
    setUsername(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, Logout, Login, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
