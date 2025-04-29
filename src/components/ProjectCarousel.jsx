"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce solution with React, Node.js and MongoDB, featuring real-time inventory management and seamless payment integration",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Travel Booking App",
    description:
      "An intuitive travel booking platform with personalized recommendations and secure payment processing",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop",
    tags: ["Next.js", "Express", "PostgreSQL"],
  },
  {
    id: 3,
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool that creates high-quality articles and marketing copy",
    image:
      "https://images.unsplash.com/photo-1677442135078-744696dae559?q=80&w=1000&auto=format&fit=crop",
    tags: ["Python", "TensorFlow", "React"],
  },
  {
    id: 4,
    title: "Health & Fitness Tracker",
    description:
      "A comprehensive fitness tracking application with customizable workout plans and nutrition monitoring",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
    tags: ["React Native", "Firebase", "GraphQL"],
  },
];

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
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
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, isAutoPlaying]);

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
          <div className="flex items-center justify-end mb-4 gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-white text-[#3445ED] border-white hover:bg-white hover:text-[#3445ED] rounded-full h-10 w-10 flex items-center justify-center"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="bg-white text-[#3445ED] border-white hover:bg-white hover:text-[#3445ED] rounded-full h-10 w-10 flex items-center justify-center"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl shadow-xl">
            <div
              className="flex transition-transform duration-500 ease-out h-[350px] md:h-[450px]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {projects.map((project) => (
                <div key={project.id} className="w-full flex-shrink-0 relative">
                  <Card className="h-full overflow-hidden border-none shadow-lg rounded-xl mx-auto">
                    <CardContent className="p-0">
                      <div className="relative h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 800px"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col items-center text-center">
                          <div className="flex flex-wrap gap-2 mb-3 justify-center">
                            {project.tags.map((tag) => (
                              <Badge
                                key={tag}
                                className="bg-blue-500/80 text-white"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                            {project.title}
                          </h3>

                          <p className="text-gray-300 mb-6 max-w-2xl">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-gray-600"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
