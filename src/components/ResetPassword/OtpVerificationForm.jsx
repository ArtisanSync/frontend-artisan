import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Cookies from "js-cookie";

export default function OtpVerificationForm() {
  const [otp, setOtp] = useState("");
  const { handleVerifyOtp, auth, clearError } = useAuth();
  const email = Cookies.get("resetEmail") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.trim()) {
      try {
        await handleVerifyOtp(otp);
      } catch (error) {
        console.error("OTP verification error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-white">Verify OTP</h3>
        <p className="text-sm text-gray-400 mt-1">
          We've sent a verification code to {email}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="otp" className="text-white">
          Verification Code
        </Label>
        <Input
          id="otp"
          type="text"
          placeholder="Enter verification code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 text-center text-lg tracking-widest"
          maxLength={6}
        />
      </div>

      {auth.error && (
        <Alert
          variant="destructive"
          className="bg-red-500/10 border-red-500/20 text-red-500"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {auth.error.message ||
              "Invalid verification code. Please try again."}
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
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
          </>
        ) : (
          "Verify Code"
        )}
      </Button>
    </form>
  );
}
