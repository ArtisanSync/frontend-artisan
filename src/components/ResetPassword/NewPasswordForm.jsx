import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, EyeIcon, EyeOffIcon, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function NewPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { handleResetPassword, auth, clearError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    if (password.trim()) {
      try {
        await handleResetPassword(password);
      } catch (error) {
        console.error("Reset password error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-white">Set New Password</h3>
        <p className="text-sm text-gray-400 mt-1">
          Create a new secure password for your account
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-white">
          New Password
        </Label>
        <div className="relative">
          <Input
            id="newPassword"
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-white">
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordsMatch(true);
          }}
          required
          className={`bg-white/10 border-white/20 text-white placeholder:text-gray-500 ${
            !passwordsMatch ? "border-red-500" : ""
          }`}
        />
        {!passwordsMatch && (
          <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
        )}
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
