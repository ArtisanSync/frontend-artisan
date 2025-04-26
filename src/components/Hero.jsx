import { Button } from "./ui/button";
import Image from "next/image";
import LeftBanner from "../../public/left-banner.svg";
import RightBanner from "../../public/right-banner.svg";

function Hero() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden pt-16"
      id="hero"
    >
      <div className="relative w-full">
        <div className="hidden sm:block">
          <Image
            className="absolute top-[112px] left-0 w-1/3 md:w-1/4 lg:w-auto"
            src={LeftBanner}
            alt="Decorative left banner"
            priority
          />
          <Image
            className="absolute top-0 right-0 w-1/3 md:w-1/4 lg:w-auto"
            src={RightBanner}
            alt="Decorative right banner"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 md:pt-32 lg:pt-40">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-4 sm:mb-6 md:mb-8 text-white capitalize">
            welcome to Artisan Sync
          </h1>

          <p className="text-sm sm:text-base md:text-[16px] w-full sm:w-4/5 md:w-3/4 lg:w-2/3 mb-8 sm:mb-10 md:mb-[75px] text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Habitant
            cras morbi hendrerit nunc vel sapien. In habitasse at diam
            suspendisse non vitae fermentum, pharetra arcu. Viverra a morbi ut
            donec in. Ac diam, at sed cras nisi.
          </p>

          <Button className="bg-[#CEE0FD] w-full sm:w-auto min-w-[180px] h-[43px] text-black hover:bg-blue-600 hover:text-white">
            lets work together
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
