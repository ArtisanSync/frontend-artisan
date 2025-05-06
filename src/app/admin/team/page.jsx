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
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Team Members</h1>
          <Button
            onClick={() => router.push("/admin/team/new")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add Team Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.length > 0 &&
            teamMembers.map((member) => (
              <div
                key={member.id || `member-${Math.random()}`}
                className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition cursor-pointer"
                onClick={() => router.push(`/admin/team/${member.id}`)}
              >
                <div className="w-24 h-24 relative rounded-full overflow-hidden mx-auto mb-3">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <span className="text-white/40">No Photo</span>
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
            ))}

          {teamMembers.length === 0 && (
            <div className="col-span-full text-center text-white/60 py-8">
              No team members yet. Add your first team member!
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
