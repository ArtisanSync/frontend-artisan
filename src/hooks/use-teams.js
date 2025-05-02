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
