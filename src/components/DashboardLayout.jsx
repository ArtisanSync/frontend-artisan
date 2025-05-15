"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const { logout, auth } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Projects", path: "/admin/projects" },
    { name: "Services", path: "/admin/services" },
    { name: "Team", path: "/admin/team" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#10101E]">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#0a0a14] p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">ArtisanSync</h1>
        <button
          onClick={toggleSidebar}
          className="text-white p-2 rounded-md hover:bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar for mobile (slide out) */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-[#0a0a14] p-4 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-white">ArtisanSync</h1>
          <button onClick={toggleSidebar} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
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

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-6 pt-6 border-t border-white/10">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar for desktop */}
      <div className="hidden md:block w-64 bg-[#0a0a14] p-4 shrink-0">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">ArtisanSync</h1>
          <p className="text-white/60 text-sm">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">{children}</div>
    </div>
  );
}
