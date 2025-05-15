"use client";

import { useState } from "react";
import { useProjectsAdmin } from "@/hooks/use-projects";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProjectsPage() {
  const { data: projectsData, isLoading, isError } = useProjectsAdmin();
  const router = useRouter();

  const projects = Array.isArray(projectsData) ? projectsData : [];

  // Fungsi untuk mendapatkan thumbnail yang tepat berdasarkan tipe media
  const getProjectThumbnail = (project) => {
    // Jika project memiliki array media, gunakan item pertama
    if (project.media && project.media.length > 0) {
      const firstMedia = project.media[0];
      if (firstMedia.type === "image") {
        return {
          url: firstMedia.url,
          isVideo: false,
        };
      } else if (firstMedia.type === "video") {
        return {
          url: firstMedia.url,
          isVideo: true,
        };
      }
    }

    // Fallback ke image lama (kompatibilitas dengan data lama)
    if (project.image) {
      return {
        url: project.image,
        isVideo: false,
      };
    }

    // Tidak ada media
    return null;
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-white">Loading projects...</div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="text-red-500">Error loading projects.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl md:text-2xl font-bold text-white">Projects</h1>
          <Button
            onClick={() => router.push("/admin/projects/new")}
            className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
          >
            Add Project
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {projects.length > 0 &&
            projects.map((project) => {
              const thumbnail = getProjectThumbnail(project);

              return (
                <div
                  key={project.id || `project-${Math.random()}`}
                  className="bg-white/5 p-3 md:p-4 rounded-lg hover:bg-white/10 transition cursor-pointer"
                  onClick={() => router.push(`/admin/projects/${project.id}`)}
                >
                  <div className="aspect-video relative mb-2 md:mb-3 rounded-md overflow-hidden">
                    {thumbnail ? (
                      thumbnail.isVideo ? (
                        <div className="w-full h-full">
                          <video
                            src={thumbnail.url}
                            className="object-cover w-full h-full"
                            // Disable controls for list view
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <div className="bg-white/20 rounded-full p-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-white"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full h-full">
                          <Image
                            src={thumbnail.url}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-white/40">No Media</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-medium truncate">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              );
            })}

          {projects.length === 0 && (
            <div className="col-span-full text-center text-white/60 py-6 md:py-8">
              No projects yet. Create your first project!
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
