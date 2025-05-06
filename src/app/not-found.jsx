"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#10101E] p-4">
      <div className="w-full max-w-md">
        <div className="text-center space-y-6">
          <div className="relative w-full">
            <h1 className="text-[120px] md:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 leading-none">
              404
            </h1>
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full -z-10"></div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-white">Page not found</h2>
            <p className="text-white/60 max-w-sm mx-auto">
              The page you're looking for doesn't exist or has been moved to
              another URL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              asChild
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/">
                <HomeIcon className="mr-2 h-4 w-4" />
                Go to Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-white/10 text-white hover:bg-white/5 bg-white/5"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
