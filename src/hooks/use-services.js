import { useQuery } from "@tanstack/react-query";
import { ServiceService } from "@/services/service.service";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: ServiceService.getServices,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
