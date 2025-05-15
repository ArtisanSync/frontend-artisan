"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { ServiceService } from "@/services/service.service";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function ServiceDetailPage() {
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    number: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { id } = params;
  const isNewService = id === "new";

  useEffect(() => {
    if (isNewService) {
      setIsLoading(false);
      return;
    }

    const fetchService = async () => {
      try {
        const response = await ServiceService.getServiceById(id);
        console.log("Service data received:", response);

        // Pastikan kita mengambil data dari struktur yang benar
        const serviceData = response.data || response; // API mengembalikan { success: true, data: {...} }

        setService(serviceData);

        setFormData({
          title: serviceData.title || "",
          description: serviceData.description || "",
          number: serviceData.number || "",
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError("Failed to load service");
        setIsLoading(false);
      }
    };

    fetchService();
  }, [id, isNewService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (isNewService) {
        await ServiceService.createService(formData);
      } else {
        await ServiceService.updateService(id, formData);
      }

      // Invalidate and refetch services
      queryClient.invalidateQueries({ queryKey: ["services"] });
      router.push("/admin/services");
    } catch (err) {
      setError("Failed to save service");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await ServiceService.deleteService(id);
        queryClient.invalidateQueries({ queryKey: ["services"] });
        router.push("/admin/services");
      } catch (err) {
        setError("Failed to delete service");
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
            {isNewService ? "Create New Service" : "Edit Service"}
          </h1>

          {!isNewService && (
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
              className="w-full bg-white/5 border border-white/10 rounded-md p-2 h-24 md:h-32 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-2">Number (optional)</label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={() => router.push("/admin/services")}
              className="bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
            >
              {isSaving ? "Saving..." : "Save Service"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
