"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Code,
  Layout,
  PaintBucket,
  Globe,
  Database,
  Monitor,
} from "lucide-react";
import useAos from "@/hooks/use-aos";
export default function ServicesAccordion() {
  useAos();
  const services = [
    {
      id: "frontend-development",
      title: "Frontend Development",
      icon: <Layout className="h-5 w-5 text-blue-500" />,
      description:
        "Modern, responsive interfaces built with React, Next.js, and other cutting-edge frontend technologies. We create beautiful, performant user interfaces that work across all devices.",
      features: [
        "Responsive design",
        "Interactive UIs",
        "Performance optimization",
        "Cross-browser compatibility",
        "State management",
      ],
    },
    {
      id: "backend-development",
      title: "Backend Development",
      icon: <Database className="h-5 w-5 text-emerald-500" />,
      description:
        "Robust server-side solutions using Node.js, Express, and other backend frameworks. We build secure, scalable APIs and services that power your web applications.",
      features: [
        "API development",
        "Database design",
        "Authentication systems",
        "Performance optimization",
        "Security implementation",
        "Serverless Architecture",
      ],
    },
    {
      id: "full-stack-development",
      title: "Full Stack Development",
      icon: <Code className="h-5 w-5 text-purple-500" />,
      description:
        "End-to-end web development services combining both frontend and backend expertise. We handle everything from database design to user interface implementation.",
      features: [
        "Comprehensive solutions",
        "Database architecture",
        "API integration",
        "Frontend implementation",
        "DevOps setup",
        "Serverless Architecture",
      ],
    },
    {
      id: "web-optimization",
      title: "Web Performance Optimization",
      icon: <Monitor className="h-5 w-5 text-amber-500" />,
      description:
        "Speed up your website and improve user experience through advanced optimization techniques. We improve loading times, responsiveness, and overall performance.",
      features: [
        "Core Web Vitals improvement",
        "Asset optimization",
        "Code splitting",
        "Lazy loading",
        "Caching strategies",
      ],
    },
  ];

  return (
    <section
      id="web-services"
      className="w-full py-12 md:py-24 bg-gradient-to-b flex justify-center"
    >
      <div className="container px-4 md:px-6 flex flex-col items-center">
        <div className="text-center mb-12 max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            data-aos="zoom-in"
            data-aos-duration="900"
          >
            Web <span className="text-blue-500">Development Services</span>
          </h2>
          <div
            className="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-6"
            data-aos="fade-up"
            data-aos-duration="200"
          ></div>
          <p className="text-gray-300" data-aos="fade-up">
            Discover our comprehensive web development expertise to bring your
            digital vision to life
          </p>
        </div>

        <div
          className="w-full max-w-6xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <Accordion type="single" collapsible className="w-full">
            {services.map((service) => (
              <AccordionItem
                key={service.id}
                value={service.id}
                className="bg-black/60 backdrop-blur-sm mb-4 rounded-xl border border-white/10 overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-blue-500/10 transition-colors">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex-shrink-0 p-2 rounded-md bg-white/5">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-medium text-white">
                      {service.title}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 pt-2">
                  <div className="text-gray-300 mb-4">
                    {service.description}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-white/80 mb-2">
                      Key Features:
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-sm text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
