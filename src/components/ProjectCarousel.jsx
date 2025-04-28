"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce solution with React, Node.js and MongoDB, featuring real-time inventory management and seamless payment integration",
    image: "/images/projects/ecommerce.jpg",
    tags: ["React", "Node.js", "MongoDB"],
    demoLink: "https://example.com",
    githubLink: "https://github.com",
  },
  {
    id: 2,
    title: "Travel Booking App",
    description:
      "An intuitive travel booking platform with personalized recommendations and secure payment processing",
    image: "/images/projects/travel.jpg",
    tags: ["Next.js", "Express", "PostgreSQL"],
    demoLink: "https://example.com",
    githubLink: "https://github.com",
  },
  {
    id: 3,
    title: "AI Content Generator",
    description:
      "An AI-powered content generation tool that creates high-quality articles and marketing copy",
    image: "/images/projects/ai.jpg",
    tags: ["Python", "TensorFlow", "React"],
    demoLink: "https://example.com",
    githubLink: "https://github.com",
  },
  {
    id: 4,
    title: "Health & Fitness Tracker",
    description:
      "A comprehensive fitness tracking application with customizable workout plans and nutrition monitoring",
    image: "/images/projects/fitness.jpg",
    tags: ["React Native", "Firebase", "GraphQL"],
    demoLink: "https://example.com",
    githubLink: "https://github.com",
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

        <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out h-[500px] md:h-[600px]"
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

                        <div className="flex flex-wrap gap-3 justify-center">
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                            asChild
                          >
                            <a
                              href={project.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                              View Demo
                            </a>
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/30 text-white hover:bg-white/10 gap-2"
                            asChild
                          >
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-4 w-4" />
                              Source Code
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white border-white/10 hover:bg-black/70 hover:text-white rounded-full h-10 w-10 hidden md:flex items-center justify-center"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white border-white/10 hover:bg-black/70 hover:text-white rounded-full h-10 w-10 hidden md:flex items-center justify-center"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

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
