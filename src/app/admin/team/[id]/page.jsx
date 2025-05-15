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
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
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

        // Handle untuk gambar/video dari struktur baru (media) atau lama (photo)
        if (memberData.media && memberData.media.url) {
          setMediaPreview({
            url: memberData.media.url,
            type: memberData.media.type || "image",
            fileId: memberData.media.fileId,
          });
        } else if (
          memberData.photoUrl ||
          memberData.photo ||
          memberData.image
        ) {
          setMediaPreview({
            url: memberData.photoUrl || memberData.photo || memberData.image,
            type: "image",
            fileId: memberData.photoFileId,
          });
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

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);

      // Deteksi tipe file
      const fileType = file.type.startsWith("image/") ? "image" : "video";

      if (fileType === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaPreview({
            url: reader.result,
            type: "image",
            name: file.name,
          });
        };
        reader.readAsDataURL(file);
      } else {
        // Untuk video, gunakan URL.createObjectURL
        const videoUrl = URL.createObjectURL(file);
        setMediaPreview({
          url: videoUrl,
          type: "video",
          name: file.name,
        });
      }
    }
  };

  const handleDeleteMedia = () => {
    if (window.confirm("Are you sure you want to delete this media?")) {
      setMediaFile(null);
      setMediaPreview(null);

      // Jika sedang mengedit anggota tim dan ada media, tandai untuk dihapus
      if (!isNewMember && teamMember) {
        setFormData({ ...formData, deleteMedia: "true" });
      }
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

      // Handle for media file
      if (mediaFile) {
        formDataObj.append("media", mediaFile);

        // Set content type header in service if it's a video
        if (mediaFile.type.startsWith("video/")) {
          formDataObj.append("mediaType", "video");
        }
      } else if (formData.deleteMedia) {
        formDataObj.append("deleteMedia", "true");
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
      console.error("Error saving team member:", err);
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
            <label className="block text-white mb-2">Media (Photo/Video)</label>
            <div className="text-white/60 text-sm mb-2">
              Upload an image (max 10MB) or video (max 100MB)
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <input
                type="file"
                onChange={handleMediaChange}
                className="hidden"
                id="teamMemberMedia"
                accept="image/*,video/*"
              />
              <label
                htmlFor="teamMemberMedia"
                className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white cursor-pointer hover:bg-white/10 transition w-full sm:w-auto text-center"
              >
                Choose File
              </label>
              <span className="text-white/60 text-sm break-all sm:break-normal">
                {mediaFile ? mediaFile.name : "No file chosen"}
              </span>
            </div>

            {mediaPreview && (
              <div className="mt-3">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-lg overflow-hidden bg-white/5">
                      {mediaPreview.type === "image" ? (
                        <img
                          src={mediaPreview.url}
                          alt="Preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <video
                          src={mediaPreview.url}
                          className="object-cover w-full h-full"
                          controls
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleDeleteMedia}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {mediaPreview.type === "image" ? "Image" : "Video"}
                    </p>
                    <p className="text-white/60 text-sm">
                      {mediaPreview.name ||
                        (mediaPreview.type === "image" ? "Photo" : "Video")}
                    </p>
                  </div>
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
