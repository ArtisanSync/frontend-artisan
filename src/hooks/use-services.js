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

export function useServicesAdmin() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      try {
        const response = await ServiceService.getServices();

        // Menangani berbagai kemungkinan struktur data
        let services = [];

        if (Array.isArray(response)) {
          services = response;
        } else if (response && Array.isArray(response.data)) {
          services = response.data;
        } else if (response && typeof response === "object") {
          console.log("Unexpected API response structure:", response);
        } else {
          console.log("API returned invalid data:", response);
        }

        // Memastikan setiap service memiliki ID yang valid (bisa id atau _id)
        return services
          .map((service) => {
            // MongoDB biasanya menggunakan _id, jadi pastikan kita memiliki id yang valid
            if (!service.id && service._id) {
              return { ...service, id: service._id };
            }
            return service;
          })
          .filter((service) => service.id || service._id); // Hanya kembalikan service dengan ID valid
      } catch (error) {
        console.error("Error fetching services:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
