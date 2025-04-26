import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Code,
  PaintBucket,
  ShoppingBag,
  Globe,
  Smartphone,
  Wrench,
} from "lucide-react";

export default function ServicesAccordion() {
  const services = [
    {
      id: "website-development",
      title: "Website Development",
      icon: <Globe className="h-5 w-5 text-blue-500" />,
      description:
        "Professional, responsive websites built with the latest technologies. From simple landing pages to complex web applications, we deliver pixel-perfect solutions tailored to your business needs.",
      features: [
        "Custom designs",
        "Responsive layouts",
        "SEO optimization",
        "High performance",
        "Content management systems",
      ],
    },
    {
      id: "e-commerce",
      title: "E-Commerce Solutions",
      icon: <ShoppingBag className="h-5 w-5 text-emerald-500" />,
      description:
        "Complete online store development with secure payment gateways, product management, and inventory systems. Transform your business with our scalable e-commerce solutions.",
      features: [
        "Product catalog",
        "Payment integration",
        "Shopping cart system",
        "Order management",
        "Customer accounts",
      ],
    },
    {
      id: "ui-design",
      title: "UI/UX Design Services",
      icon: <PaintBucket className="h-5 w-5 text-rose-500" />,
      description:
        "User-centered design that delights your audience. We create intuitive interfaces and seamless user experiences that convert visitors into loyal customers.",
      features: [
        "User research",
        "Wireframing",
        "Prototyping",
        "Visual design",
        "Usability testing",
      ],
    },
    {
      id: "web-maintenance",
      title: "Website Maintenance & Support",
      icon: <Wrench className="h-5 w-5 text-amber-500" />,
      description:
        "Ongoing support and maintenance to keep your digital products running smoothly. Regular updates, security patches, and performance optimization to protect your investment.",
      features: [
        "Regular updates",
        "Security monitoring",
        "Performance optimization",
        "Content updates",
        "Technical support",
      ],
    },
    {
      id: "custom-web-apps",
      title: "Custom Web Applications",
      icon: <Code className="h-5 w-5 text-indigo-500" />,
      description:
        "Tailor-made web applications designed to solve your specific business challenges. From CRM systems to project management tools, we build solutions that streamline operations.",
      features: [
        "Custom functionality",
        "Integration with existing systems",
        "Scalable architecture",
        "Data analytics",
        "Admin dashboards",
      ],
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 bg-gradient-to-b flex justify-center">
      <div className="container px-4 md:px-6 flex flex-col items-center">
        <div className="text-center mb-12 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Our <span className="text-blue-500">Services</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-300">
            Explore how ArtisanSync can transform your digital presence with our
            comprehensive web development services
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto">
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
