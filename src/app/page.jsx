import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import TeamSection from "@/components/TeamSection";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>TEST H! NIH</h1>
        <Button>Wahyu Dontol</Button>
        <TeamSection />
      </div>
    </>
  );
};

export default Home;
