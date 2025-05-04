"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/sync");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-4">Admin Dashboard</h1>
        <p className="text-gray-300 mb-6">
          Welcome to your ArtisanSync dashboard!
        </p>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="bg-red-600 hover:bg-red-700"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
