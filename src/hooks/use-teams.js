import { useQuery } from "@tanstack/react-query";
import { TeamService } from "@/services/team.service";

export function useTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: TeamService.getTeams,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useTeamsAdmin() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      try {
        const response = await TeamService.getTeams();

        // Menangani berbagai kemungkinan struktur data
        let teams = [];

        if (Array.isArray(response)) {
          teams = response;
        } else if (response && Array.isArray(response.data)) {
          teams = response.data;
        } else if (response && typeof response === "object") {
          console.log("Unexpected API response structure:", response);
        } else {
          console.log("API returned invalid data:", response);
        }

        // Memastikan setiap team memiliki ID yang valid (bisa id atau _id)
        return teams
          .map((team) => {
            // MongoDB biasanya menggunakan _id, jadi pastikan kita memiliki id yang valid
            if (!team.id && team._id) {
              return { ...team, id: team._id };
            }
            return team;
          })
          .filter((team) => team.id || team._id); // Hanya kembalikan team dengan ID valid
      } catch (error) {
        console.error("Error fetching teams:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
