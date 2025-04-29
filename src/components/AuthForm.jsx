"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

export default function AuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPasswordVisible, setIsForgotPasswordVisible] = useState(false);
  const [isForgotPasswordSubmitted, setIsForgotPasswordSubmitted] =
    useState(false);
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/");
    } catch (err) {
      setError("Invalid login credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotPasswordLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsForgotPasswordSubmitted(true);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-md shadow-xl">
      <CardHeader className="space-y-1">
        <div className="text-2xl font-bold text-white">Sign In</div>
        <p className="text-sm text-gray-400">
          Enter your email and password to access your account
        </p>
      </CardHeader>
      <CardContent>
        {!isForgotPasswordVisible ? (
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
                onClick={() => setIsForgotPasswordVisible(true)}
                className="text-xs text-blue-400 hover:text-blue-300 mt-1 inline-block"
              >
                Forgot password?
              </button>
            </div>
            {error && (
              <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-md">
                {error}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        ) : (
          <div>
            {!isForgotPasswordSubmitted ? (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgotPasswordEmail" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="forgotPasswordEmail"
                    type="email"
                    placeholder="name@example.com"
                    value={forgotPasswordEmail}
                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="text-xs text-gray-400">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </div>
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={forgotPasswordLoading}
                  >
                    {forgotPasswordLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsForgotPasswordVisible(false)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 py-2">
                <div className="rounded-md bg-blue-500/20 p-4 text-center">
                  <div className="text-white font-medium">
                    Password Reset Email Sent
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    We've sent a password reset link to {forgotPasswordEmail}
                  </p>
                </div>
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    setIsForgotPasswordVisible(false);
                    setIsForgotPasswordSubmitted(false);
                    setForgotPasswordEmail("");
                  }}
                >
                  Back to Sign In
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
