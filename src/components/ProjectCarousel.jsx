"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  const { data, isLoading, isError, error } = useProjects();
  const projects = data?.data || [];

  const nextSlide = () => {
    if (!projects.length || transitioning) return;

    setTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );

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

    setTimeout(() => {
      setTransitioning(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (transitioning) return;

    setTransitioning(true);
    setCurrentIndex(index);
    setIsAutoPlaying(false);

    setTimeout(() => {
      setTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 4000);
    }, 300);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (transitioning) return;

    if (touchStart - touchEnd > 75) {
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  const getModifiedIndex = (index) => {
    if (index < 0) return projects.length - 1;
    if (index >= projects.length) return 0;
    return index;
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying && projects.length > 0 && !transitioning) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, isAutoPlaying, projects.length, transitioning]);

  return (
    <section
      id="projects"
      className="w-full py-16 md:py-24 flex items-center justify-center"
    >
      <div className="container px-4 md:px-6 mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm rounded-full border-primary/30 text-white"
          >
            Our Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full my-2"></div>
          <p className="max-w-[600px] text-base text-gray-400 md:text-lg">
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
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-black/50 text-blue-400 border-blue-500/30 hover:bg-black/70 hover:text-blue-300 rounded-full h-8 w-8 flex items-center justify-center"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  disabled={isLoading || projects.length <= 1 || transitioning}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="bg-black/50 text-blue-400 border-blue-500/30 hover:bg-black/70 hover:text-blue-300 rounded-full h-8 w-8 flex items-center justify-center"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  disabled={isLoading || projects.length <= 1 || transitioning}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
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
                    <div
                      className="relative h-[350px] md:h-[450px]"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    >
                      {projects && projects.length > 0 ? (
                        <>
                          <div className="absolute left-0 w-1/4 h-full transform -translate-x-1/4 z-10 transition-all duration-300 ease-out">
                            <div className="relative h-full rounded-xl overflow-hidden opacity-40 blur-[1px] scale-90 shadow-lg">
                              {projects[getModifiedIndex(currentIndex - 1)]
                                ?.image && (
                                <div className="absolute inset-0">
                                  <Image
                                    src={
                                      projects[
                                        getModifiedIndex(currentIndex - 1)
                                      ].image
                                    }
                                    alt={
                                      projects[
                                        getModifiedIndex(currentIndex - 1)
                                      ].title || "Previous Project"
                                    }
                                    fill
                                    className="object-cover"
                                    sizes="25vw"
                                    unoptimized={true}
                                    style={{
                                      objectFit: "cover",
                                      objectPosition: "center",
                                    }}
                                  />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>
                            </div>
                          </div>

                          <div className="absolute left-1/2 transform -translate-x-1/2 w-3/5 h-full z-20 transition-all duration-300 ease-out">
                            <div className="relative h-full rounded-xl overflow-hidden shadow-2xl">
                              {projects[currentIndex]?.image && (
                                <div className="absolute inset-0">
                                  <Image
                                    src={projects[currentIndex].image}
                                    alt={
                                      projects[currentIndex].title ||
                                      "Current Project"
                                    }
                                    fill
                                    className="object-cover"
                                    priority={true}
                                    sizes="60vw"
                                    unoptimized={true}
                                    style={{
                                      objectFit: "cover",
                                      objectPosition: "center",
                                    }}
                                  />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>

                              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col items-center text-center">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                  {projects[currentIndex].title ||
                                    "Untitled Project"}
                                </h3>
                                <p className="text-gray-300 mb-6 max-w-2xl">
                                  {projects[currentIndex].description ||
                                    "No description available"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="absolute right-0 w-1/4 h-full transform translate-x-1/4 z-10 transition-all duration-300 ease-out">
                            <div className="relative h-full rounded-xl overflow-hidden opacity-40 blur-[1px] scale-90 shadow-lg">
                              {projects[getModifiedIndex(currentIndex + 1)]
                                ?.image && (
                                <div className="absolute inset-0">
                                  <Image
                                    src={
                                      projects[
                                        getModifiedIndex(currentIndex + 1)
                                      ].image
                                    }
                                    alt={
                                      projects[
                                        getModifiedIndex(currentIndex + 1)
                                      ].title || "Next Project"
                                    }
                                    fill
                                    className="object-cover"
                                    sizes="25vw"
                                    unoptimized={true}
                                    style={{
                                      objectFit: "cover",
                                      objectPosition: "center",
                                    }}
                                  />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>
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
                          : "w-2 bg-gray-600"
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
  );
}
