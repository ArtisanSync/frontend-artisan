import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>TEST H! NIH</h1>
        <Button>Artisan cihuyy</Button>
        <Button>TEST</Button>

        <p className="mt-[400px]">test scroll</p>
        <p className="mt-[400px]">test scroll</p>
        <p className="mt-[400px]">test scroll</p>
      </div>
    </>
  );
};

export default Home;
