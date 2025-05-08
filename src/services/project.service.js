import api from "@/lib/api";

export const ProjectService = {
  getProjects: async () => {
    const response = await api.get("/public/projects");
    return response.data;
  },

  getProjectById: async (id) => {
    const response = await api.get(`/admin/projects/${id}`);
    return response.data;
  },

  createProject: async (formData) => {
    const response = await api.post("/admin/projects", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateProject: async (id, formData) => {
    const response = await api.put(`/admin/projects/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteProject: async (id) => {
    const response = await api.delete(`/admin/projects/${id}`);
    return response.data;
  },
};
