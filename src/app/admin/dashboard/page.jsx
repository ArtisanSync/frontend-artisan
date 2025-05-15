"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useProjectsAdmin } from "@/hooks/use-projects";
import { useServicesAdmin } from "@/hooks/use-services";
import { useTeamsAdmin } from "@/hooks/use-teams";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";

export default function Dashboard() {
  const { data: projects, isLoading: isLoadingProjects } = useProjectsAdmin();
  const { data: services, isLoading: isLoadingServices } = useServicesAdmin();
  const { data: teamMembers, isLoading: isLoadingTeam } = useTeamsAdmin();
  const { auth } = useAuth();

  const isLoading = isLoadingProjects || isLoadingServices || isLoadingTeam;

  const stats = [
    {
      name: "Projects",
      count: Array.isArray(projects) ? projects.length : 0,
      path: "/admin/projects",
    },
    {
      name: "Services",
      count: Array.isArray(services) ? services.length : 0,
      path: "/admin/services",
    },
    {
      name: "Team Members",
      count: Array.isArray(teamMembers) ? teamMembers.length : 0,
      path: "/admin/team",
    },
  ];

  return (
    <DashboardLayout>
      <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-300 mb-1">
          Welcome to your ArtisanSync dashboard!
        </p>
        {auth?.user && (
          <p className="text-gray-400 text-sm">
            Logged in as: {auth.user.email}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg">
          <p className="text-white">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            {stats.map((stat) => (
              <Link href={stat.path} key={stat.name}>
                <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg hover:bg-white/15 transition">
                  <h2 className="text-white/70 text-lg">{stat.name}</h2>
                  <p className="text-white text-2xl md:text-3xl font-bold">
                    {stat.count}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg">
              <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
                Recent Projects
              </h2>
              <div className="space-y-2">
                {Array.isArray(projects) && projects.length > 0 ? (
                  projects.slice(0, 5).map((project) => (
                    <Link
                      href={`/admin/projects/${project.id}`}
                      key={project.id || `project-${Math.random()}`}
                    >
                      <div className="p-2 md:p-3 hover:bg-white/10 rounded-md transition">
                        <h3 className="text-white font-medium">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-sm truncate">
                          {project.description}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-white/60 py-3">No projects yet.</p>
                )}
              </div>
              <div className="mt-3 md:mt-4">
                <Link
                  href="/admin/projects"
                  className="text-blue-400 hover:text-blue-300"
                >
                  View all projects →
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg">
              <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
                Recent Services
              </h2>
              <div className="space-y-2">
                {Array.isArray(services) && services.length > 0 ? (
                  services.slice(0, 5).map((service) => (
                    <Link
                      href={`/admin/services/${service.id}`}
                      key={service.id || `service-${Math.random()}`}
                    >
                      <div className="p-2 md:p-3 hover:bg-white/10 rounded-md transition">
                        <h3 className="text-white font-medium">
                          {service.title || service.name}
                        </h3>
                        <p className="text-white/60 text-sm truncate">
                          {service.description}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-white/60 py-3">No services yet.</p>
                )}
              </div>
              <div className="mt-3 md:mt-4">
                <Link
                  href="/admin/services"
                  className="text-blue-400 hover:text-blue-300"
                >
                  View all services →
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
