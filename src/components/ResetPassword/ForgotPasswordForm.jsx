import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const { handleForgotPassword, auth, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      try {
        await handleForgotPassword(email);
      } catch (error) {
        console.error("Forgot password error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Email Address
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

      <div className="text-xs text-gray-400">
        Enter your email address and we'll send you a verification code to reset
        your password.
      </div>

      {auth.error && (
        <Alert
          variant="destructive"
          className="bg-red-500/10 border-red-500/20 text-red-500"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {auth.error.message || "An error occurred. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        disabled={auth.isLoading}
      >
        {auth.isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
