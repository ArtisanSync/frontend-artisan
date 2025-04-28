import TeamSection from "@/components/TeamSection";
import Hero from "@/components/Hero";
import FounderSection from "@/components/FounderSection";
import Service from "@/components/Service";
import ServicesAccordion from "@/components/ServicesAccordion";

const Home = () => {
  return (
    <>
      <Hero />
      <FounderSection />
      <Service />
      <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <TeamSection />
      </div>
      <ServicesAccordion />
    </>
  );
};

export default Home;
