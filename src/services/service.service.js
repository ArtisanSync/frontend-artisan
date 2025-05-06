import api from "@/lib/api";

export const ServiceService = {
  getServices: async () => {
    const response = await api.get("/services");
    return response.data;
  },
};
