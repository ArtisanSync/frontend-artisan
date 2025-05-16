"use client";

import { useState, useRef } from "react";
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
  Play,
  Pause,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function ProjectsPage() {
  const { data, isLoading, isError, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const playerRefs = useRef({});
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

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setCurrentMediaIndex(0);
    setIsPlaying({});
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
    setIsPlaying({});
    setIsDialogOpen(false);
  };

  const nextMedia = (e) => {
    e.stopPropagation();
    const mediaCount = getMediaCount(selectedProject);
    if (mediaCount <= 1) return;
    setCurrentMediaIndex((prev) => (prev === mediaCount - 1 ? 0 : prev + 1));
    setIsPlaying({});
  };

  const prevMedia = (e) => {
    e.stopPropagation();
    const mediaCount = getMediaCount(selectedProject);
    if (mediaCount <= 1) return;
    setCurrentMediaIndex((prev) => (prev === 0 ? mediaCount - 1 : prev - 1));
    setIsPlaying({});
  };

  const getMediaCount = (project) => {
    if (
      project?.media &&
      Array.isArray(project.media) &&
      project.media.length > 0
    ) {
      return project.media.length;
    }
    return project?.image ? 1 : 0;
  };

  const getProjectMedia = (project, index = 0) => {
    if (!project) return { url: null, type: null };

    if (
      project.media &&
      Array.isArray(project.media) &&
      project.media.length > 0
    ) {
      if (index >= 0 && index < project.media.length) {
        return {
          url: project.media[index].url,
          type: project.media[index].type || "image",
        };
      }
      return {
        url: project.media[0].url,
        type: project.media[0].type || "image",
      };
    }

    return {
      url: project.image || null,
      type: "image",
    };
  };

  const getProjectThumbnail = (project) => {
    return getProjectMedia(project, 0);
  };

  const togglePlayPause = (e, id) => {
    e.stopPropagation();
    setIsPlaying((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const MediaDisplay = ({ url, type, project, index, inModal = false, id }) => {
    if (!url) return null;

    const mediaId = `${id || project?._id || index}-${type}`;

    if (type === "video") {
      return (
        <div className="relative w-full h-full">
          <ReactPlayer
            ref={(el) => {
              if (el) playerRefs.current[mediaId] = el;
            }}
            url={url}
            width="100%"
            height="100%"
            controls={false}
            playing={!!isPlaying[mediaId]}
            loop={true}
            muted={!isPlaying[mediaId]}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  disablePictureInPicture: true,
                },
              },
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "contain",
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
            onClick={(e) => togglePlayPause(e, mediaId)}
          >
            {!isPlaying[mediaId] && (
              <div className="bg-black/50 rounded-full p-3 opacity-80 hover:opacity-100 transition-opacity">
                <Play size={24} />
              </div>
            )}
          </div>
          {isPlaying[mediaId] && (
            <button
              onClick={(e) => togglePlayPause(e, mediaId)}
              className="absolute bottom-4 right-4 bg-black/60 rounded-full p-2 text-white hover:bg-black/80 transition-colors z-30"
              aria-label="Pause"
            >
              <Pause size={20} />
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="absolute inset-0">
        <Image
          src={url}
          alt={project?.title || "Project"}
          fill
          className="object-contain"
          priority={inModal}
          sizes={inModal ? "(max-width: 768px) 100vw, 800px" : "33vw"}
          unoptimized={true}
          loading={inModal ? "eager" : "lazy"}
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white py-10">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-2 mb-12">
          <Link
            href="/"
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
              {currentProjects.map((project) => {
                const thumbnail = getProjectThumbnail(project);
                const mediaCount = getMediaCount(project);

                return (
                  <Card
                    key={project._id}
                    className="bg-gray-800/30 border-gray-700 overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all group py-0"
                  >
                    <div className="relative h-[200px] overflow-hidden bg-gray-700">
                      {thumbnail.url ? (
                        <>
                          {thumbnail.type === "image" ? (
                            <Image
                              src={thumbnail.url}
                              alt={project.title || "Project image"}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 33vw"
                              unoptimized={true}
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full relative">
                              <Image
                                src={`https://i.vimeocdn.com/video/default_1280x720.webp`}
                                alt={project.title || "Video thumbnail"}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500 blur-sm"
                                sizes="(max-width: 768px) 100vw, 33vw"
                                unoptimized={true}
                                loading="lazy"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black/50 rounded-full p-3">
                                  <Play size={24} className="text-white" />
                                </div>
                              </div>
                            </div>
                          )}

                          {mediaCount > 1 && (
                            <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1 text-xs text-white">
                              <div className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-3 h-3"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>+{mediaCount - 1}</span>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <p className="text-gray-500">No media available</p>
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
                      <Button
                        variant="ghost"
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 px-4"
                        onClick={() => handleProjectSelect(project)}
                      >
                        Details
                      </Button>

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
                );
              })}
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

      {isDialogOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-transparent"
            onClick={handleCloseDialog}
          ></div>

          <div className="bg-gray-900 rounded-xl w-full max-w-4xl z-10 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseDialog}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors z-30"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative w-full h-[50vh] md:h-[65vh] bg-gray-800 group">
              {(() => {
                const media = getProjectMedia(
                  selectedProject,
                  currentMediaIndex
                );
                const mediaCount = getMediaCount(selectedProject);

                return media.url ? (
                  <>
                    <MediaDisplay
                      url={media.url}
                      type={media.type}
                      project={selectedProject}
                      inModal={true}
                      id={`modal-${selectedProject._id}-${currentMediaIndex}`}
                    />

                    {mediaCount > 1 && (
                      <>
                        <button
                          onClick={prevMedia}
                          className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors z-30 opacity-60 hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={nextMedia}
                          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors z-30 opacity-60 hover:opacity-100"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                          {Array.from({ length: mediaCount }).map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-2 rounded-full transition-all cursor-pointer ${
                                idx === currentMediaIndex
                                  ? "w-8 bg-white"
                                  : "w-2 bg-white/50 hover:bg-white/70"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentMediaIndex(idx);
                                setIsPlaying({});
                              }}
                            ></div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-500">No media available</p>
                  </div>
                );
              })()}
            </div>

            <div className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {selectedProject.title || "Untitled Project"}
              </h3>

              <div className="space-y-6">
                <p className="text-gray-300 text-justify text-base">
                  {selectedProject.description || "No description available"}
                </p>

                {selectedProject.details && (
                  <div className="mt-6">
                    <h4 className="text-xl font-semibold text-blue-400 mb-3">
                      Project Details
                    </h4>
                    <p className="text-gray-300 text-justify">
                      {selectedProject.details}
                    </p>
                  </div>
                )}

                {selectedProject.technologies &&
                  selectedProject.technologies.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-xl font-semibold text-blue-400 mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            className="bg-blue-900/50 text-blue-200 border-blue-500/30 py-1.5 px-3"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                {selectedProject.link && (
                  <div className="mt-8">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base"
                      onClick={() =>
                        window.open(selectedProject.link, "_blank")
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Project
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
