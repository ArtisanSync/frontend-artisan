import api from "@/lib/api";

export const ServiceService = {
  getServices: async () => {
    const response = await api.get("/services");
    return response.data;
  },

  getServiceById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  createService: async (data) => {
    const response = await api.post("/services", data);
    return response.data;
  },

  updateService: async (id, data) => {
    const response = await api.put(`/services/${id}`, data);
    return response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },
};
