"use client";

import { useState } from "react";
import { useTeamsAdmin } from "@/hooks/use-teams";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function TeamPage() {
  const { data: teamData, isLoading, isError } = useTeamsAdmin();
  const router = useRouter();

  const teamMembers = Array.isArray(teamData) ? teamData : [];

  // Fungsi untuk mendapatkan media yang tepat berdasarkan tipe
  const getTeamMemberMedia = (member) => {
    // Jika member memiliki format media baru
    if (member.media && member.media.url) {
      return {
        url: member.media.url,
        type: member.media.type || "image",
      };
    }

    // Fallback ke format lama (kompatibilitas dengan data lama)
    if (member.photo || member.photoUrl || member.image) {
      return {
        url: member.photo || member.photoUrl || member.image,
        type: "image",
      };
    }

    // Tidak ada media
    return null;
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-white">Loading team members...</div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="text-red-500">Error loading team members.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Team Members
          </h1>
          <Button
            onClick={() => router.push("/admin/team/new")}
            className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
          >
            Add Team Member
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {teamMembers.length > 0 &&
            teamMembers.map((member) => {
              const media = getTeamMemberMedia(member);

              return (
                <div
                  key={member.id || `member-${Math.random()}`}
                  className="bg-white/5 p-3 md:p-4 rounded-lg hover:bg-white/10 transition cursor-pointer"
                  onClick={() => router.push(`/admin/team/${member.id}`)}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 relative rounded-full overflow-hidden mx-auto mb-3">
                    {media ? (
                      media.type === "image" ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={media.url}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full relative">
                          <video
                            src={media.url}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <div className="bg-white/20 rounded-full p-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 text-white"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-white/40 text-xs md:text-sm">
                          No Media
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-medium text-center">
                    {member.name}
                  </h3>
                  <p className="text-white/60 text-sm text-center">
                    {member.position || member.title}
                  </p>
                </div>
              );
            })}

          {teamMembers.length === 0 && (
            <div className="col-span-full text-center text-white/60 py-6 md:py-8">
              No team members yet. Add your first team member!
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
