import api from "@/lib/api";

export const TeamService = {
  getTeams: async () => {
    const response = await api.get("/public/team");
    return response.data;
  },

  getTeamMemberById: async (id) => {
    const response = await api.get(`/admin/team/${id}`);
    return response.data;
  },

  createTeamMember: async (formData) => {
    const response = await api.post("/admin/team", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateTeamMember: async (id, formData) => {
    const response = await api.put(`/admin/team/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  deleteTeamMember: async (id) => {
    const response = await api.delete(`/admin/team/${id}`);
    return response.data;
  },
};
