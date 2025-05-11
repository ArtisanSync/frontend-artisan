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
      const status = error.response.status;

      if (status === 401) {
        handleInvalidToken();
      }

      if (status >= 500) {
        error.response.data = {
          message: "Server error occurred. Please try again later.",
          ...error.response.data,
        };
      }
    } else if (error.request) {
      error.response = {
        data: {
          message:
            "No response received from server. Please check your connection.",
        },
      };
    } else {
      error.response = {
        data: {
          message: "An unexpected error occurred. Please try again.",
        },
      };
    }
    return Promise.reject(error);
  }
);

export default api;
