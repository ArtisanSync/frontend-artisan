"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Play, Pause } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import useAos from "@/hooks/use-aos";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [nextClickCount, setNextClickCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState({});
  const playerRefs = useRef({});

  const { data, isLoading, isError, error } = useProjects();
  const projects = data?.data || [];

  const nextSlide = () => {
    if (!projects.length || transitioning) return;

    setTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
    setCurrentImageIndex(0);
    setNextClickCount((prev) => prev + 1);
    setIsPlaying({});

    setTimeout(() => {
      setTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (!projects.length || transitioning) return;

    setTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
    setCurrentImageIndex(0);
    setIsPlaying({});

    setTimeout(() => {
      setTransitioning(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (transitioning) return;

    setTransitioning(true);
    setCurrentIndex(index);
    setCurrentImageIndex(0);
    setIsPlaying({});

    setTimeout(() => {
      setTransitioning(false);
    }, 300);
  };

  const getModifiedIndex = (index) => {
    if (index < 0) return projects.length - 1;
    if (index >= projects.length) return 0;
    return index;
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
    document.body.style.overflow = "";
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

  const togglePlayPause = (e, id) => {
    e.stopPropagation();
    setIsPlaying((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [showModal]);

  useEffect(() => {
    setIsPlaying({});
  }, [currentImageIndex, currentIndex, showModal]);

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
          priority={inModal || index === currentIndex}
          sizes={inModal ? "(max-width: 768px) 100vw, 800px" : "60vw"}
          unoptimized={true}
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
    );
  };

  return (
    <>
      <section
        id="projects"
        className="w-full my-16 md:my-24 flex items-center justify-center"
      >
        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 md:mb-16 max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className="px-4 py-1 text-lg rounded-full border-primary/30 text-white"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              Our Portfolio
            </Badge>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              Featured Projects
            </h2>
            <div
              className="w-16 h-1 bg-blue-500 rounded-full my-2"
              data-aos="fade-up"
              data-aos-duration="500"
            ></div>
            <p
              className="max-w-[600px] text-base text-gray-400 md:text-lg"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              Explore our latest works showcasing our expertise and creativity
            </p>
          </div>

          <div className="relative w-full max-w-5xl mx-auto">
            {isError && (
              <div className="flex flex-col items-center justify-center h-[350px] md:h-[450px] bg-gray-900/50 rounded-xl text-center p-6">
                <p className="text-red-400 mb-2">Something went wrong</p>
                <p className="text-gray-400 max-w-md">
                  {error?.message ||
                    "Failed to load projects. Please try again later."}
                </p>
              </div>
            )}

            {!isError && (
              <>
                <div className="flex items-center justify-end mb-4 gap-2">
                  {nextClickCount >= 3 ? (
                    <Link href="/projects">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 transition-all shadow-lg hover:shadow-blue-500/20">
                        View All Projects
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-black/50 text-blue-400 border-blue-500/30 hover:bg-blue-600 hover:text-blue-300 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer"
                        onClick={prevSlide}
                        aria-label="Previous slide"
                        disabled={
                          isLoading || projects.length <= 1 || transitioning
                        }
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-black/50 text-blue-400 border-blue-500/30 hover:bg-blue-600 hover:text-blue-300 rounded-full h-8 w-8 flex items-center justify-center cursor-pointer"
                        onClick={nextSlide}
                        aria-label="Next slide"
                        disabled={
                          isLoading || projects.length <= 1 || transitioning
                        }
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>

                <div className="overflow-hidden">
                  {isLoading ? (
                    <div className="h-[350px] md:h-[450px] bg-gray-800/50 rounded-xl overflow-hidden">
                      <div className="relative h-full flex items-center justify-center">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-3/5 h-full z-20">
                          <Skeleton className="h-full w-full rounded-xl absolute" />
                          <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-8">
                            <Skeleton className="h-7 w-40 mb-2" />
                            <Skeleton className="h-4 w-52 mb-1" />
                            <Skeleton className="h-4 w-48 mb-6" />
                          </div>
                        </div>
                        <div className="absolute left-0 w-1/4 h-full transform -translate-x-1/4 z-10">
                          <Skeleton className="h-full w-full rounded-xl opacity-40 scale-90" />
                        </div>
                        <div className="absolute right-0 w-1/4 h-full transform translate-x-1/4 z-10">
                          <Skeleton className="h-full w-full rounded-xl opacity-40 scale-90" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative h-[350px] md:h-[450px] overflow-visible">
                        {projects && projects.length > 0 ? (
                          <>
                            <div
                              className="absolute left-0 w-1/4 h-full transform -translate-x-1/4 z-10 transition-all duration-300 ease-out cursor-pointer group md:block"
                              onClick={prevSlide}
                            >
                              <div className="relative h-full rounded-xl overflow-hidden opacity-40 blur-[1px] scale-90 shadow-lg group-hover:opacity-100 group-hover:blur-[0px] group-hover:scale-95 transition-all duration-300">
                                {getProjectMedia(
                                  projects[getModifiedIndex(currentIndex - 1)]
                                ).url && (
                                  <MediaDisplay
                                    url={
                                      getProjectMedia(
                                        projects[
                                          getModifiedIndex(currentIndex - 1)
                                        ]
                                      ).url
                                    }
                                    type="image"
                                    project={
                                      projects[
                                        getModifiedIndex(currentIndex - 1)
                                      ]
                                    }
                                    index={getModifiedIndex(currentIndex - 1)}
                                    id={`prev-${getModifiedIndex(
                                      currentIndex - 1
                                    )}`}
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 group-hover:via-black/50 group-hover:to-black/5"></div>
                              </div>
                            </div>

                            <div
                              className="absolute left-1/2 transform -translate-x-1/2 w-[90%] md:w-3/5 h-full z-20 transition-all duration-300 ease-out cursor-pointer group"
                              onClick={() => openModal(projects[currentIndex])}
                            >
                              <div className="relative h-full rounded-xl overflow-hidden shadow-2xl group-hover:shadow-blue-500/20 group-hover:shadow-lg transition-all duration-300">
                                {getProjectMedia(projects[currentIndex])
                                  .url && (
                                  <MediaDisplay
                                    url={
                                      getProjectMedia(projects[currentIndex])
                                        .url
                                    }
                                    type={
                                      getProjectMedia(projects[currentIndex])
                                        .type
                                    }
                                    project={projects[currentIndex]}
                                    index={currentIndex}
                                    id={`current-${currentIndex}-0`}
                                  />
                                )}

                                {getProjectMedia(projects[currentIndex])
                                  .type !== "video" && (
                                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 group-hover:via-black/60 group-hover:to-black/10 transition-opacity duration-300"></div>
                                )}

                                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="absolute inset-0 rounded-xl border border-blue-500/50 shadow-[0px_0px_15px_rgba(59,130,246,0.5)]"></div>
                                </div>

                                {getMediaCount(projects[currentIndex]) > 1 && (
                                  <div className="absolute top-4 right-4 z-30 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
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
                                      <span>
                                        +
                                        {getMediaCount(projects[currentIndex]) -
                                          1}
                                      </span>
                                    </div>
                                  </div>
                                )}

                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 h-full w-full text-center grid grid-rows-3">
                                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 mt-auto">
                                    {projects[currentIndex].title ||
                                      "Untitled Project"}
                                  </h3>
                                  <div className="row-span-2 flex items-center">
                                    <p className="text-gray-300 text-justify max-w-2xl group-hover:text-white transition-colors duration-300 text-[10px] md:text-[14px] lg:text-[16px] ">
                                      {projects[currentIndex].description ||
                                        "No description available"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div
                              className="absolute right-0 w-1/4 h-full transform translate-x-1/4 z-10 transition-all duration-300 ease-out cursor-pointer group md:block"
                              onClick={nextSlide}
                            >
                              <div className="relative h-full rounded-xl overflow-hidden opacity-40 blur-[1px] scale-90 shadow-lg group-hover:opacity-100 group-hover:blur-[0px] group-hover:scale-95 transition-all duration-300">
                                {getProjectMedia(
                                  projects[getModifiedIndex(currentIndex + 1)]
                                ).url && (
                                  <MediaDisplay
                                    url={
                                      getProjectMedia(
                                        projects[
                                          getModifiedIndex(currentIndex + 1)
                                        ]
                                      ).url
                                    }
                                    type="image"
                                    project={
                                      projects[
                                        getModifiedIndex(currentIndex + 1)
                                      ]
                                    }
                                    index={getModifiedIndex(currentIndex + 1)}
                                    id={`next-${getModifiedIndex(
                                      currentIndex + 1
                                    )}`}
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 group-hover:via-black/50 group-hover:to-black/5"></div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="w-full h-full relative rounded-xl overflow-hidden shadow-lg bg-gray-800">
                            <div className="relative h-full flex items-center justify-center">
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>
                              <p className="text-white z-10">
                                No projects available
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {!isLoading && projects && projects.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "w-8 bg-blue-500"
                            : "w-2 bg-gray-600 hover:bg-blue-400 hover:w-4"
                        }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        disabled={transitioning}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-transparent"
            onClick={closeModal}
          ></div>

          <div className="bg-gray-900 rounded-xl w-full max-w-4xl z-10 relative overflow-y-auto h-[70%] md:h-[80%] lg:h-[90%]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-30"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative w-full h-[300px] sm:h-[400px] bg-gray-700 group">
              {(() => {
                const media = getProjectMedia(
                  selectedProject,
                  currentImageIndex
                );
                const mediaCount = getMediaCount(selectedProject);

                return media.url ? (
                  <>
                    <MediaDisplay
                      url={media.url}
                      type={media.type}
                      project={selectedProject}
                      index={currentIndex}
                      inModal={true}
                      id={`modal-${selectedProject._id}-${currentImageIndex}`}
                    />

                    {mediaCount > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) =>
                              prev === 0 ? mediaCount - 1 : prev - 1
                            );
                          }}
                          className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors z-30 opacity-0 group-hover:opacity-100"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) =>
                              prev === mediaCount - 1 ? 0 : prev + 1
                            );
                          }}
                          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors z-30 opacity-0 group-hover:opacity-100"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                          {Array.from({ length: mediaCount }).map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-2 rounded-full transition-all flex items-center justify-center relative ${
                                idx === currentImageIndex
                                  ? "w-8 bg-white"
                                  : "w-2 bg-white/50 hover:bg-white/70 cursor-pointer"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(idx);
                              }}
                            ></div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <p className="text-gray-400">No media available</p>
                  </div>
                );
              })()}
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {selectedProject.title || "Untitled Project"}
              </h3>

              <div className="space-y-4">
                <p className="text-gray-300">
                  {selectedProject.description || "No description available"}
                </p>

                {selectedProject.details && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">
                      Project Details
                    </h4>
                    <p className="text-gray-300">{selectedProject.details}</p>
                  </div>
                )}

                {selectedProject.technologies && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          className="bg-blue-900/50 text-blue-200 border-blue-500/30 hover:bg-blue-800/60 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.link && (
                  <div className="mt-6">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base px-4 py-1.5 md:py-2 rounded-full transition-colors"
                      onClick={() =>
                        window.open(selectedProject.link, "_blank")
                      }
                    >
                      View Project
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
