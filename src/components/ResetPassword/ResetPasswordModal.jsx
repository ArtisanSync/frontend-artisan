import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import ForgotPasswordForm from "./ForgotPasswordForm";
import OtpVerificationForm from "./OtpVerificationForm";
import NewPasswordForm from "./NewPasswordForm";
import ResetSuccessView from "./ResetSuccessView";

export default function ResetPasswordModal({ isOpen, onClose }) {
  const { auth, resetState } = useAuth();

  const handleClose = () => {
    resetState();
    onClose();
  };

  const renderStepContent = () => {
    switch (auth.resetStep) {
      case "email":
        return <ForgotPasswordForm />;
      case "otp":
        return <OtpVerificationForm />;
      case "password":
        return <NewPasswordForm />;
      case "success":
        return <ResetSuccessView onClose={onClose} />;
      default:
        return <ForgotPasswordForm />;
    }
  };

  const getDialogTitle = () => {
    switch (auth.resetStep) {
      case "email":
        return "Reset Password";
      case "otp":
        return "Verify Code";
      case "password":
        return "New Password";
      case "success":
        return "Success";
      default:
        return "Reset Password";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-black/90 text-white border-white/10 p-6 sm:max-w-md backdrop-blur-lg fixed z-50">
        <DialogTitle className="text-xl font-semibold text-center mb-4">
          {getDialogTitle()}
        </DialogTitle>
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
}
