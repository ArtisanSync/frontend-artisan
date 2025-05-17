import TeamSection from "@/components/TeamSection";
import Hero from "@/components/Hero";
import FounderSection from "@/components/FounderSection";
import Service from "@/components/Service";
import ServicesAccordion from "@/components/ServicesAccordion";
import ProjectCarousel from "@/components/ProjectCarousel";
import Contact from "@/components/Contact";
import Script from "next/script";

export const metadata = {
  title: "Artisan Sync | Professional Software Development Services",
  description:
    "We are a team of professional software developers dedicated to delivering the best digital solutions for your business website and applications.",
  keywords:
    "software development, web development, mobile app, digital solutions, responsive websites, professional developers, Indonesia",
  openGraph: {
    title: "Artisan Sync | Professional Software Development Services",
    description:
      "We are a team of professional software developers dedicated to delivering the best digital solutions for your business.",
    url: "https://artisansync.com",
    siteName: "Artisan Sync",
    images: [
      {
        url: "https://ik.imagekit.io/72mu50jam/logo%20vertical%20no%20text.jpg?updatedAt=1747501207279",
        width: 1200,
        height: 630,
        alt: "Artisan Sync - Professional Software Development Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const Home = () => {
  return (
    <>
      <Script
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Artisan Sync",
            url: "https://artisansync.com",
            logo: "https://ik.imagekit.io/72mu50jam/logo%20vertical%20no%20text.jpg?updatedAt=1747501207279",
            description: "Professional Software Development Services",
            address: {
              "@type": "PostalAddress",
              addressCountry: "Indonesia",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              email: "syncartisan@gmail.com",
            },
            sameAs: [
              "https://www.linkedin.com/company/artisansync",
              "https://www.instagram.com/artisan_sync/",
            ],
          }),
        }}
      />
      <Hero />
      <FounderSection />
      <Service />
      <ProjectCarousel />
      <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <TeamSection />
      </div>
      <ServicesAccordion />
      <Contact />
    </>
  );
};

export default Home;
