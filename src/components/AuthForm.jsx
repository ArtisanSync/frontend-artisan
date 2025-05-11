"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Loader2, AlertCircle } from "lucide-react";
import ResetPasswordModal from "./ResetPassword/ResetPasswordModal";
import { useAuth } from "@/hooks/use-auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const { login, auth, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      try {
        setIsLoggingIn(true);
        await login(email, password);
        router.push("/admin/dashboard");
      } catch (error) {
        console.error("Login error:", error);
        setLoginError(
          error.response?.data?.message ||
            "Authentication failed. Please check your credentials."
        );
        setShowErrorDialog(true);
      } finally {
        setIsLoggingIn(false);
      }
    }
  };

  const closeErrorDialog = () => {
    setShowErrorDialog(false);
    setLoginError("");
    clearError();
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

      <AlertDialog
        open={showErrorDialog}
        onOpenChange={(open) => {
          if (!open) closeErrorDialog();
        }}
      >
        <AlertDialogContent className="bg-red-950 border-red-500/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Authentication Failed
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              {loginError ||
                "An error occurred during login. Please try again."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={closeErrorDialog}
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
