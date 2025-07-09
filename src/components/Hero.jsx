"use client";

import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import Image from "next/image";
import LeftBanner from "../../public/left-banner.webp";
import RightBanner from "../../public/right-banner.webp";
import useAos from "../hooks/use-aos";
import UseTypeIt from "@/hooks/use-typeit";

function Hero() {
  useAos();

  const typingRef = UseTypeIt();

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-[430px] w-full overflow-hidden pt-16 md:h-full"
      id="hero"
    >
      <div className="w-full max-w-[550px] md:max-w-[1920px] 2xl:max-w-[2560px]">
        <div className="">
          <Image
            className="float-left w-1/2 pt-[35px] md:pt-[50px] md:w-2/3"
            src={LeftBanner}
            alt="Decorative left banner"
            priority
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          />
          <Image
            className="float-right w-1/3 md:w-1/3"
            src={RightBanner}
            alt="Decorative right banner"
            priority
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          />
        </div>
      </div>

      <div className="absolute z-10 mx-auto px-4 sm:px-6 lg:px-8 p-16 sm:pt-24 md:pt-32 lg:pt-40 xl:px-[150px] 2xl:ms-auto 2xl:pt-[15%] 2xl:ps-[15%]">
        <div className="max-w-3xl">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold mb-4 sm:mb-6 md:mb-8 text-white capitalize"
            ref={typingRef}
          ></h1>

          <p
            className="text-sm text-justify sm:text-base md:text-[16px] w-full sm:w-4/5 md:w-3/4 lg:w-2/3 mb-8 sm:mb-10 md:mb-[75px] text-white"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            We are ArtisanSync, a team of professional software developers
            dedicated to delivering the best digital solutions for your business
            website. From responsive websites to intuitive mobile applications,
            we translate your vision into high-quality digital products.
          </p>

          <InteractiveHoverButton
            className="bg-[#CEE0FD] w-full min-w-[180px] md:w-auto md:h-[43px] text-black hover:text-white"
            onClick={handleScrollToContact}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            Let's Work Together
          </InteractiveHoverButton>
        </div>
      </div>
    </section>
  );
}

export default Hero;
