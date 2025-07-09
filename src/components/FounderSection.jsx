"use client";

import Image from "next/image";
import { images } from "@/constants/images";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Award, Briefcase, GraduationCap } from "lucide-react";

const FounderSection = () => {
  return (
    <div className="mt-4 pb-7 md:py-20 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <Badge
              variant="outline"
              className="px-4 py-2 rounded-full border-primary/30 gap-2 bg-blue-500/5"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              <MessageSquare className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400">Founder & CEO</span>
            </Badge>

            <h2
              className="text-4xl py-4 md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="100"
            >
              Yogi Efani Yancandra
            </h2>

            <div className="space-y-4">
              <div
                className="flex gap-3 items-start"
                data-aos="fade-right"
                data-aos-duration="1100"
                data-aos-delay="200"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-600/20 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none max-w-sm">
                  <p className="text-gray-200 text-sm">
                    As the founder of ArtisanSync, Yogi specializes in creating
                    comprehensive digital solutions for modern businesses.
                  </p>
                </div>
              </div>

              <div
                className="flex gap-3 items-start"
                data-aos="fade-right"
                data-aos-duration="1100"
                data-aos-delay="400"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div className="bg-blue-600/20 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none max-w-sm">
                  <p className="text-gray-200 text-sm">
                    With a passion for creating seamless user experiences and
                    robust applications, he leads our team of talented
                    developers to deliver exceptional results for our clients.
                  </p>
                </div>
              </div>

              <div
                className="flex justify-end gap-3 items-start"
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                <div className="bg-gray-700/40 backdrop-blur-sm p-4 rounded-2xl rounded-tr-none max-w-sm">
                  <p className="text-gray-200 text-sm">
                    Want to learn more about how we can help with your project?
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <Award className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src={images.heroImageTwo}
                alt="Yogi Profile"
                width={500}
                height={500}
                className="rounded-lg"
                data-aos="fade-left"
                data-aos-duration="900"
                data-aos-delay="100"
              />
              <div
                className="absolute -bottom-4 -right-4 p-3 flex items-center gap-3 bg-black/80 backdrop-blur-sm rounded-lg border border-white/10 "
                data-aos="fade-left"
                data-aos-duration="900"
                data-aos-delay="100"
              >
                <GraduationCap className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-sm font-medium text-white">
                    ArtisanSync
                  </div>
                  <div className="text-xs text-gray-400">
                    Crafting Digital Excellence
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderSection;
