import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function ResetSuccessView() {
  const { resetState } = useAuth();

  return (
    <div className="text-center space-y-4">
      <div className="mx-auto bg-green-500/20 rounded-full p-3 h-16 w-16 flex items-center justify-center">
        <Check className="h-8 w-8 text-green-500" />
      </div>

      <h3 className="text-xl font-semibold text-white">
        Password Reset Successfully
      </h3>

      <p className="text-gray-400 text-sm">
        Your password has been changed successfully. You can now sign in with
        your new password.
      </p>

      <Button
        onClick={resetState}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
      >
        Back to Sign In
      </Button>
    </div>
  );
}
