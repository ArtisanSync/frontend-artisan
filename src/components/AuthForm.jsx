"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import ResetPasswordModal from "./ResetPassword/ResetPasswordModal";
import { useAuth } from "@/hooks/use-auth";

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login, auth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      try {
        setIsLoggingIn(true);
        await login(email, password);
        router.push("/admin/dashboard");
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setIsLoggingIn(false);
      }
    }
  };

  return (
    <>
      <Card className="border-white/10 bg-black/40 backdrop-blur-md shadow-xl">
        <CardHeader className="space-y-1">
          <div className="text-2xl font-bold text-white">Sign In</div>
          <p className="text-sm text-gray-400">
            Enter your email and password to access your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white pr-10 placeholder:text-gray-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setIsResetModalOpen(true)}
                className="text-xs text-blue-400 hover:text-blue-300 mt-1 inline-block"
              >
                Forgot password?
              </button>
            </div>
            {auth.error && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-md">
                {auth.error.message ||
                  "Invalid login credentials. Please try again."}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <ResetPasswordModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </>
  );
}
