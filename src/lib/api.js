import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (!decoded.exp) return false;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

const handleInvalidToken = () => {
  Cookies.remove("token");
  if (typeof window !== "undefined") {
    window.location.href = "/sync";
  }
};

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      if (isTokenValid(token)) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        handleInvalidToken();
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        handleInvalidToken();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
