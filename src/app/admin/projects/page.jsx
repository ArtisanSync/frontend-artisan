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
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <Button
            onClick={() => router.push("/admin/projects/new")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add Project
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.length > 0 &&
            projects.map((project) => (
              <div
                key={project.id || `project-${Math.random()}`}
                className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition cursor-pointer"
                onClick={() => router.push(`/admin/projects/${project.id}`)}
              >
                <div className="aspect-video relative mb-3 rounded-md overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-white/40">No Image</span>
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
            ))}

          {projects.length === 0 && (
            <div className="col-span-full text-center text-white/60 py-8">
              No projects yet. Create your first project!
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
