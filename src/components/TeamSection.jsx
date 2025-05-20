"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTeams } from "@/hooks/use-teams";
import { AlertCircle, Link } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FaLinkedin } from "react-icons/fa";
import useAos from "@/hooks/use-aos";

const TeamSection = () => {
  useAos();

  const { data, isLoading, isError, error } = useTeams();

  const teamMembers = data?.data || [];

  return (
    <section
      id="team"
      className="w-full my-6 sm:my-8 md:my-10 from-background to-muted/30 bg-[#10101E]"
    >
      <div className="container px-4 mx-auto md:px-6 ">
        <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10 sm:mb-16">
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm rounded-full border-primary/30 text-white"
            data-aos="fade-down"
            data-aos-duration="500"
          >
            Our Experts
          </Badge>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-500 bg-clip-text text-transparent"
            data-aos="zoom-in"
            data-aos-duration="900"
          >
            Meet Our Team
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full my-3"></div>
          <p
            className="max-w-[600px] text-base sm:text-lg text-white"
            data-aos="fade-up"
          >
            Talented professionals building exceptional experiences
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10">
            {[1, 2, 3, 4].map((item) => (
              <Card
                key={item}
                className="overflow-hidden border-none shadow-lg rounded-2xl backdrop-blur-sm bg-[#161630]/80 py-0"
              >
                <div className="flex flex-col h-full">
                  <Skeleton className="aspect-square w-full h-full rounded-t-2xl" />
                  <CardContent className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-[#161630] rounded-b-2xl">
                    <div>
                      <Skeleton className="h-8 w-3/4 rounded-md mb-2" />
                      <Skeleton className="h-4 w-1/2 rounded-md mb-4" />
                      <div className="h-0.5 w-12 bg-white/40 my-3 rounded-full"></div>
                      <Skeleton className="h-16 w-full rounded-md mt-3" />
                      <Skeleton className="h-[24px] mt-5 w-[24px]" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-red-900/20 border border-red-900/30 rounded-xl">
            <AlertCircle className="w-12 h-12 text-red-500 mb-2" />
            <h3 className="text-xl font-bold text-white mb-1">
              Error Loading Team Data
            </h3>
            <p className="text-gray-300">
              {error?.message ||
                "An unexpected error occurred. Please try again later."}
            </p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center bg-blue-900/20 border border-blue-900/30 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-1">
              No Team Members Found
            </h3>
            <p className="text-gray-300">
              Check back later for updates to our team.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {teamMembers.map((member) => {
              let linkedinUrl = "";

              // Hardcode berdasarkan nama atau ID
              https: if (member.name === "Naufal Annafi")
                linkedinUrl =
                  "https://www.linkedin.com/in/naufal-annafi-bb623935b/";
              if (member.name === "Wahyu Hary Saputra Sembiring")
                linkedinUrl = "https://www.linkedin.com/in/wahyuhary/";
              if (member.name === "Yogi Efani Yancandra")
                linkedinUrl = "https://www.linkedin.com/in/yogiefaniyancandra/";
              if (member.name === "Tegar Alfa Rizzi")
                linkedinUrl = "//www.linkedin.com/in/tegar-alfa-rizzi/";
              if (member.name === "Rafly Aziz Abdillah")
                linkedinUrl = "https://www.linkedin.com/in/raflyazizabdillah/";
              if (member.name === "Wahyu Pinanda Ginting")
                linkedinUrl = "https://www.linkedin.com/in/wahyupinanda/";
              if (member.name === "Gizka Triwulandari")
                linkedinUrl =
                  "https://www.linkedin.com/in/gizka-triwulandari-58aa01255/";

              return (
                <Card
                  key={member._id}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl backdrop-blur-sm bg-[#161630]/80 py-0"
                >
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-square w-full overflow-hidden rounded-t-2xl hover:scale-105 lg:hover:scale-110 transition-transform duration-700 ">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover rounded-t-2xl"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <Badge className="bg-primary/80 text-white text-xs font-medium py-1 px-2.5">
                          {member.title}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-[#161630] rounded-b-2xl">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          {member.name}
                        </h3>
                        <CardDescription className="text-sm sm:text-md font-medium text-white/55 hidden sm:block">
                          {member.title}
                        </CardDescription>
                        <div className="h-0.5 w-12 bg-white/40 my-3 rounded-full"></div>
                        <p className="text-gray-300 text-sm mt-3 text-justify">
                          {member.description}
                        </p>
                      </div>
                      <div className="mt-5 flex">
                        {linkedinUrl && (
                          <a
                            href={linkedinUrl}
                            alt={`LinkedIn ${member.name}`}
                            className="text-gray-400 hover:text-blue-500 transition-colors duration-300 hover:scale-100"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedin
                              className="hover:scale-115 duration-200"
                              size={24}
                            />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
