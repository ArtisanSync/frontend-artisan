import api from "../lib/api";

export const TeamService = {
  getTeams: async () => {
    const response = await api.get("/team");
    return response.data;
  },
};
