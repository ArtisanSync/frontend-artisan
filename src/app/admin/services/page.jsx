"use client";

import { useState } from "react";
import { useServicesAdmin } from "@/hooks/use-services";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const { data: servicesData, isLoading, isError } = useServicesAdmin();
  const router = useRouter();

  const services = Array.isArray(servicesData) ? servicesData : [];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-white">Loading services...</div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout>
        <div className="text-red-500">Error loading services.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-white/10 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3 sm:gap-0">
          <h1 className="text-xl md:text-2xl font-bold text-white">Services</h1>
          <Button
            onClick={() => router.push("/admin/services/new")}
            className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
          >
            Add Service
          </Button>
        </div>

        {/* Desktop view - Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-white">
            <thead className="text-white/70 border-b border-white/10">
              <tr>
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 &&
                services.map((service) => (
                  <tr
                    key={service.id || `service-${Math.random()}`}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="py-3 px-4">
                      {service.name || service.title}
                    </td>
                    <td className="py-3 px-4 text-white/70 truncate max-w-xs">
                      {service.description}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        onClick={() =>
                          router.push(`/admin/services/${service.id}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view - Cards */}
        <div className="md:hidden space-y-3">
          {services.length > 0 &&
            services.map((service) => (
              <div
                key={service.id || `service-${Math.random()}`}
                className="bg-white/5 p-3 rounded-lg"
              >
                <h3 className="text-white font-medium">
                  {service.name || service.title}
                </h3>
                <p className="text-white/70 text-sm mb-3 line-clamp-2">
                  {service.description}
                </p>
                <Button
                  onClick={() => router.push(`/admin/services/${service.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm w-full"
                  size="sm"
                >
                  Edit
                </Button>
              </div>
            ))}
        </div>

        {services.length === 0 && (
          <div className="text-center text-white/60 py-6 md:py-8">
            No services yet. Create your first service!
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
