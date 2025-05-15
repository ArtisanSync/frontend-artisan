"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { TeamService } from "@/services/team.service";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function TeamMemberDetailPage() {
  const [teamMember, setTeamMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { id } = params;
  const isNewMember = id === "new";

  useEffect(() => {
    if (isNewMember) {
      setIsLoading(false);
      return;
    }

    const fetchTeamMember = async () => {
      try {
        const response = await TeamService.getTeamMemberById(id);
        console.log("Team member data received:", response);

        // Pastikan kita mengambil data dari struktur yang benar
        const memberData = response.data || response; // API mengembalikan { success: true, data: {...} }

        setTeamMember(memberData);

        setFormData({
          name: memberData.name || "",
          title: memberData.title || "",
          description: memberData.description || "",
        });

        if (memberData.photoUrl || memberData.photo || memberData.image) {
          setPhotoPreview(
            memberData.photoUrl || memberData.photo || memberData.image
          );
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching team member:", err);
        setError("Failed to load team member");
        setIsLoading(false);
      }
    };

    fetchTeamMember();
  }, [id, isNewMember]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);

      if (photoFile) {
        formDataObj.append("photo", photoFile);
      }

      if (isNewMember) {
        await TeamService.createTeamMember(formDataObj);
      } else {
        await TeamService.updateTeamMember(id, formDataObj);
      }

      // Invalidate and refetch team members
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      router.push("/admin/team");
    } catch (err) {
      setError("Failed to save team member");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      try {
        await TeamService.deleteTeamMember(id);
        queryClient.invalidateQueries({ queryKey: ["teams"] });
        router.push("/admin/team");
      } catch (err) {
        setError("Failed to delete team member");
      }
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-white">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            {isNewMember ? "Add Team Member" : "Edit Team Member"}
          </h1>

          {!isNewMember && (
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
            >
              Delete
            </Button>
          )}
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-md p-2 h-24 md:h-32 text-white"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Photo</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <input
                type="file"
                onChange={handlePhotoChange}
                className="hidden"
                id="teamMemberPhoto"
                accept="image/*"
              />
              <label
                htmlFor="teamMemberPhoto"
                className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white cursor-pointer hover:bg-white/10 transition w-full sm:w-auto text-center"
              >
                Choose File
              </label>
              <span className="text-white/60 text-sm break-all sm:break-normal">
                {photoFile ? photoFile.name : "No file chosen"}
              </span>
            </div>

            {photoPreview && (
              <div className="mt-3 flex justify-center sm:justify-start">
                <div className="w-24 h-24 relative rounded-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={() => router.push("/admin/team")}
              className="bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
            >
              {isSaving ? "Saving..." : "Save Team Member"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
