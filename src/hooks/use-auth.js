import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { AuthService } from "@/services/auth.service";
import Cookies from "js-cookie";
import {
  setResetStep,
  resetPasswordState,
  clearAuthError,
  setLoading,
  setError,
  setSuccess,
} from "@/features/auth/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => AuthService.forgotPassword(email),
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(clearAuthError());
    },
    onSuccess: (data) => {
      // Store email directly from input rather than relying on response
      Cookies.set("resetEmail", data.email, { expires: 1 });
      dispatch(setSuccess({ success: true, message: data.message }));
      dispatch(setResetStep("otp"));
    },
    onError: (error) => {
      dispatch(setError(error.response?.data || { message: error.message }));
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: ({ email, otp }) => AuthService.verifyOtp(email, otp),
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(clearAuthError());
    },
    onSuccess: (data) => {
      Cookies.set("resetToken", data.resetToken, { expires: 1 });
      dispatch(setSuccess({ success: true, message: data.message }));
      dispatch(setResetStep("password"));
    },
    onError: (error) => {
      dispatch(setError(error.response?.data || { message: error.message }));
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ resetToken, password }) =>
      AuthService.resetPassword(resetToken, password),
    onMutate: () => {
      dispatch(setLoading(true));
      dispatch(clearAuthError());
    },
    onSuccess: (data) => {
      Cookies.remove("resetEmail");
      Cookies.remove("resetToken");
      dispatch(setSuccess({ success: true, message: data.message }));
      dispatch(setResetStep("success"));
    },
    onError: (error) => {
      dispatch(setError(error.response?.data || { message: error.message }));
    },
  });

  const handleForgotPassword = (email) => {
    // Store email in cookies immediately when the user submits form
    Cookies.set("resetEmail", email, { expires: 1 });
    return forgotPasswordMutation.mutateAsync(email);
  };

  const handleVerifyOtp = (otp) => {
    const email = Cookies.get("resetEmail");
    if (!email) {
      dispatch(setError({ message: "Email not found. Please try again." }));
      return Promise.reject("Email not found");
    }
    return verifyOtpMutation.mutateAsync({ email, otp });
  };

  const handleResetPassword = (password) => {
    const resetToken = Cookies.get("resetToken");
    if (!resetToken) {
      dispatch(
        setError({
          message: "Reset token not found. Please restart the process.",
        })
      );
      return Promise.reject("Reset token not found");
    }
    return resetPasswordMutation.mutateAsync({ resetToken, password });
  };

  const resetState = () => {
    dispatch(resetPasswordState());
  };

  const changeResetStep = (step) => {
    dispatch(setResetStep(step));
  };

  const clearError = () => {
    dispatch(clearAuthError());
  };

  return {
    auth,
    handleForgotPassword,
    handleVerifyOtp,
    handleResetPassword,
    resetState,
    changeResetStep,
    clearError,
    isLoading:
      forgotPasswordMutation.isPending ||
      verifyOtpMutation.isPending ||
      resetPasswordMutation.isPending,
  };
};
