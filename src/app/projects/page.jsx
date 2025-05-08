"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProjects } from "@/hooks/use-projects";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProjectsPage() {
  const { data, isLoading, isError, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const projects = data?.data || [];

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white py-10">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-2 mb-12">
          <Link
            href="/#projects"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500">
            Our Projects
          </h1>
          <div className="w-24 h-1 bg-blue-600 rounded-full my-4"></div>
          <p className="text-gray-400 max-w-2xl text-justify">
            Explore our complete portfolio of projects showcasing our expertise
            in web development, design, and digital solutions.
          </p>
        </div>

        {isError && (
          <div className="flex flex-col items-center justify-center bg-gray-800/30 rounded-xl p-12 text-center">
            <p className="text-red-400 text-lg mb-2">Failed to load projects</p>
            <p className="text-gray-400">
              {error?.message ||
                "An error occurred while fetching projects. Please try again later."}
            </p>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card
                key={i}
                className="bg-gray-800/30 border-gray-700 overflow-hidden"
              >
                <Skeleton className="h-[200px] w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && !isError && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center bg-gray-800/30 rounded-xl p-12 text-center">
            <p className="text-white text-lg mb-2">No projects found</p>
            <p className="text-gray-400 mb-6">
              There are currently no projects to display.
            </p>
          </div>
        )}

        {!isLoading && !isError && projects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project) => (
                <Card
                  key={project._id}
                  className="bg-gray-800/30 border-gray-700 overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all group py-0"
                >
                  <div className="relative h-[200px] overflow-hidden bg-gray-700">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title || "Project image"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <p className="text-gray-500">No image available</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                      {project.title || "Untitled Project"}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 text-justify">
                      {project.description || "No description available"}
                    </p>

                    {project.technologies &&
                      project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies
                            .slice(0, 3)
                            .map((tech, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-blue-900/20 text-blue-300 border-blue-500/30"
                              >
                                {tech}
                              </Badge>
                            ))}
                          {project.technologies.length > 3 && (
                            <Badge
                              variant="outline"
                              className="bg-gray-800 text-gray-400 border-gray-600"
                            >
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex justify-between items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 px-4"
                          onClick={() => setSelectedProject(project)}
                        >
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-white">
                            {project.title}
                          </DialogTitle>
                          <DialogDescription className="text-gray-400 text-justify">
                            {project.description}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4 space-y-6">
                          <div className="relative w-full h-[300px] bg-gray-800 rounded-md overflow-hidden">
                            {project.image ? (
                              <Image
                                src={project.image}
                                alt={project.title || "Project image"}
                                fill
                                className="object-cover rounded-md"
                                sizes="(max-width: 768px) 100vw, 800px"
                                unoptimized={true}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <p className="text-gray-500">
                                  No image available
                                </p>
                              </div>
                            )}
                          </div>

                          {project.details && (
                            <div>
                              <h4 className="text-lg font-semibold text-blue-400 mb-2">
                                Project Details
                              </h4>
                              <p className="text-gray-300 text-justify">
                                {project.details}
                              </p>
                            </div>
                          )}

                          {project.technologies &&
                            project.technologies.length > 0 && (
                              <div>
                                <h4 className="text-lg font-semibold text-blue-400 mb-2">
                                  Technologies Used
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-blue-900/50 text-blue-200 border-blue-500/30"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                          {project.link && (
                            <div className="pt-4">
                              <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() =>
                                  window.open(project.link, "_blank")
                                }
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Visit Project
                              </Button>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    {project.link && (
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-700 text-gray-400 hover:text-white hover:border-blue-500"
                        onClick={() => window.open(project.link, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        currentPage === index + 1 ? "default" : "outline"
                      }
                      className={
                        currentPage === index + 1
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-gray-700 text-gray-400 hover:border-blue-500 hover:text-white"
                      }
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
