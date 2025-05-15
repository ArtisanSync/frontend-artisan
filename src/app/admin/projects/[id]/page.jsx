"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { ProjectService } from "@/services/project.service";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function ProjectDetailPage() {
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [keepExistingMedia, setKeepExistingMedia] = useState(true);

  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { id } = params;
  const isNewProject = id === "new";

  useEffect(() => {
    if (isNewProject) {
      setIsLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const response = await ProjectService.getProjectById(id);
        console.log("Project data received:", response);

        // Pastikan kita mengambil data dari struktur yang benar
        const projectData = response.data; // API mengembalikan { success: true, data: {...} }

        setProject(projectData);

        setFormData({
          title: projectData.title || "",
          description: projectData.description || "",
        });

        // Handle media previews (baik gambar maupun video)
        if (projectData.media && projectData.media.length > 0) {
          setMediaPreviews(
            projectData.media.map((item) => ({
              url: item.url,
              fileId: item.fileId,
              type: item.type,
            }))
          );
        } else if (projectData.image) {
          setMediaPreviews([
            {
              url: projectData.image,
              type: "image",
              fileId: projectData.mediaFileId || null,
            },
          ]);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project");
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id, isNewProject]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setMediaFiles(files);

      // Create previews for each file
      const newPreviews = [];

      files.forEach((file) => {
        const fileType = file.type.startsWith("image/") ? "image" : "video";

        if (fileType === "image") {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviews.push({
              url: reader.result,
              type: "image",
              name: file.name,
            });
            if (newPreviews.length === files.length) {
              setMediaPreviews(newPreviews);
            }
          };
          reader.readAsDataURL(file);
        } else {
          // For video, we can use URL.createObjectURL for preview
          const videoUrl = URL.createObjectURL(file);
          newPreviews.push({
            url: videoUrl,
            type: "video",
            name: file.name,
          });
          if (newPreviews.length === files.length) {
            setMediaPreviews(newPreviews);
          }
        }
      });
    }
  };

  const handleDeleteMediaPreview = (index) => {
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
    setMediaFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);

      // Handle media files (images and videos)
      if (mediaFiles.length > 0) {
        // Append each media file
        mediaFiles.forEach((file) => {
          formDataObj.append("media", file);
        });

        // Set the content type if it's a video to trigger the correct upload limits
        if (mediaFiles.some((file) => file.type.startsWith("video/"))) {
          formDataObj.append("mediaType", "video");
        }

        // Keep existing media if editing
        if (!isNewProject && keepExistingMedia) {
          formDataObj.append("keepMedia", "true");
        }
      }

      if (isNewProject) {
        await ProjectService.createProject(formDataObj);
      } else {
        await ProjectService.updateProject(id, formDataObj);
      }

      // Invalidate and refetch projects
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/admin/projects");
    } catch (err) {
      console.error("Error saving project:", err);
      setError("Failed to save project");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAllMedia = async () => {
    if (window.confirm("Are you sure you want to delete all media?")) {
      try {
        if (!isNewProject) {
          const formDataObj = new FormData();
          formDataObj.append("deleteAllMedia", "true");
          await ProjectService.updateProject(id, formDataObj);
          setMediaPreviews([]);
          queryClient.invalidateQueries({ queryKey: ["projects"] });
        } else {
          setMediaPreviews([]);
          setMediaFiles([]);
        }
      } catch (err) {
        setError("Failed to delete media");
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await ProjectService.deleteProject(id);
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        router.push("/admin/projects");
      } catch (err) {
        setError("Failed to delete project");
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
            {isNewProject ? "Create New Project" : "Edit Project"}
          </h1>

          {!isNewProject && (
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
              className="w-full bg-white/5 border border-white/10 rounded-md p-2 h-32 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">
              Media (Images & Videos)
            </label>
            <div className="text-white/60 text-sm mb-2">
              Upload up to 5 images (max 10MB each) or videos (max 100MB each)
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <input
                type="file"
                onChange={handleMediaChange}
                className="hidden"
                id="projectMedia"
                accept="image/*,video/*"
                multiple
              />
              <label
                htmlFor="projectMedia"
                className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white cursor-pointer hover:bg-white/10 transition w-full sm:w-auto text-center"
              >
                Choose Files
              </label>
              <span className="text-white/60 text-sm break-all sm:break-normal">
                {mediaFiles.length > 0
                  ? `${mediaFiles.length} file(s) selected`
                  : "No files chosen"}
              </span>
            </div>

            {!isNewProject && mediaPreviews.length > 0 && (
              <div className="mt-2">
                <label className="flex items-center text-white/80 mb-2">
                  <input
                    type="checkbox"
                    checked={keepExistingMedia}
                    onChange={() => setKeepExistingMedia(!keepExistingMedia)}
                    className="mr-2"
                  />
                  Keep existing media when uploading new files
                </label>
              </div>
            )}

            {mediaPreviews.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">Media Preview</h3>
                  <Button
                    type="button"
                    onClick={handleDeleteAllMedia}
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-xs py-1 px-2"
                  >
                    Delete All
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {mediaPreviews.map((media, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-md overflow-hidden bg-white/5">
                        {media.type === "image" ? (
                          <img
                            src={media.url}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <video
                            src={media.url}
                            className="w-full h-full object-cover"
                            controls
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteMediaPreview(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
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
                      <div className="mt-1 text-white/60 text-xs truncate">
                        {media.name ||
                          `${media.type === "image" ? "Image" : "Video"} ${
                            index + 1
                          }`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
            >
              {isSaving ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
