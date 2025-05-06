import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/services/project.service";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: ProjectService.getProjects,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useProjectsAdmin() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const response = await ProjectService.getProjects();

        // Menangani berbagai kemungkinan struktur data
        let projects = [];

        if (Array.isArray(response)) {
          projects = response;
        } else if (response && Array.isArray(response.data)) {
          projects = response.data;
        } else if (response && typeof response === "object") {
          console.log("Unexpected API response structure:", response);
        } else {
          console.log("API returned invalid data:", response);
        }

        // Memastikan setiap project memiliki ID yang valid (bisa id atau _id)
        return projects
          .map((project) => {
            // MongoDB biasanya menggunakan _id, jadi pastikan kita memiliki id yang valid
            if (!project.id && project._id) {
              return { ...project, id: project._id };
            }
            return project;
          })
          .filter((project) => project.id || project._id); // Hanya kembalikan project dengan ID valid
      } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
