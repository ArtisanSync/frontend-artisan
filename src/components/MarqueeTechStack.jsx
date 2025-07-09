"use client";

import Marquee from "react-fast-marquee";
import { techStackLogo } from "@/constants/techStackLogo";
import Image from "next/image";
import useAos from "@/hooks/use-aos";

export default function MarqueeTechStack() {
  useAos();
  return (
    <div className="py-10">
      <div className="flex items-center justify-center">
        <p
          className="bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent font-semibold text-3xl sm:text-4xl md:text-5xl"
          data-aos="fade-down"
          data-aos-duration="900"
        >
          Tech Stack
        </p>
      </div>
      <div className="mt-4 py-8 " data-aos="zoom-in" data-aos-duration="900">
        <Marquee autoFill speed={40} delay={1}>
          {techStackLogo.map((logo, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-8 my-8 w-24 hover:scale-115 duration-200 cursor-pointer"
            >
              <div className="bg-zinc-800 rounded-xl p-2 w-full flex flex-col items-center shadow-md">
                <div className="w-20 h-20 relative mb-2 py-3">
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <p className="text-white text-sm text-center mt-2">{logo.name}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
