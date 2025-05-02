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

  const { data, isLoading, isError, error } = useProjects();
  const projects = data?.data || [];

  const nextSlide = () => {
    if (!projects.length) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (!projects.length) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying && projects.length > 0) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, isAutoPlaying, projects.length]);

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

        <div className="relative w-full max-w-3xl mx-auto">
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
                  className="bg-white text-[#3445ED] border-white hover:bg-white hover:text-[#3445ED] rounded-full h-10 w-10 flex items-center justify-center"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  disabled={isLoading || projects.length <= 1}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="bg-white text-[#3445ED] border-white hover:bg-white hover:text-[#3445ED] rounded-full h-10 w-10 flex items-center justify-center"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  disabled={isLoading || projects.length <= 1}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-hidden rounded-xl shadow-xl">
                {isLoading ? (
                  <div className="h-[350px] md:h-[450px] bg-gray-800 rounded-xl overflow-hidden">
                    <div className="flex flex-col items-center justify-center h-full">
                      <Skeleton className="w-full h-full absolute" />
                      <div className="z-10 flex flex-col items-center p-6 md:p-8">
                        <div className="flex gap-2 mb-3">
                          <Skeleton className="h-6 w-16 rounded-full" />
                          <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64 mb-1" />
                        <Skeleton className="h-4 w-56 mb-1" />
                        <Skeleton className="h-4 w-60" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex transition-transform duration-500 ease-out h-[350px] md:h-[450px]"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {projects && projects.length > 0 ? (
                      projects.map((project) => (
                        <div
                          key={project._id}
                          className="w-full flex-shrink-0 relative rounded-xl overflow-hidden shadow-lg"
                        >
                          <div className="relative h-full">
                            {project.image && (
                              <div className="absolute inset-0">
                                <Image
                                  src={project.image}
                                  alt={project.title || "Project"}
                                  fill
                                  className="object-cover w-full h-full"
                                  priority={true}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
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
                                {project.title || "Untitled Project"}
                              </h3>
                              <p className="text-gray-300 mb-6 max-w-2xl">
                                {project.description ||
                                  "No description available"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full flex-shrink-0 relative rounded-xl overflow-hidden shadow-lg bg-gray-800">
                        <div className="relative h-full flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>
                          <p className="text-white z-10">
                            No projects available
                          </p>
                        </div>
                      </div>
                    )}
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
