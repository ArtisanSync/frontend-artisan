"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const { logout, auth } = useAuth();
  const router = useRouter();

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

  return (
    <div className="flex min-h-screen bg-[#10101E]">
      {/* Sidebar */}
      <div className="w-64 bg-[#0a0a14] p-4">
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
      <div className="flex-1 p-6 overflow-auto">{children}</div>
    </div>
  );
}
