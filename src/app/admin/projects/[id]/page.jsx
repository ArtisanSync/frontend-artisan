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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSaving, setIsSaving] = useState(false);

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

        if (projectData.image) {
          setImagePreview(projectData.image);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);

      if (imageFile) {
        formDataObj.append("image", imageFile);
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
      setError("Failed to save project");
    } finally {
      setIsSaving(false);
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
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            {isNewProject ? "Create New Project" : "Edit Project"}
          </h1>

          {!isNewProject && (
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
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
            <label className="block text-white mb-2">Image</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="projectImage"
                accept="image/*"
              />
              <label
                htmlFor="projectImage"
                className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white cursor-pointer hover:bg-white/10 transition"
              >
                Choose File
              </label>
              <span className="text-white/60 text-sm">
                {imageFile ? imageFile.name : "No file chosen"}
              </span>
            </div>

            {imagePreview && (
              <div className="mt-2">
                <div className="w-32 h-32 relative rounded-md overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="bg-white/10 hover:bg-white/20 text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSaving ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
