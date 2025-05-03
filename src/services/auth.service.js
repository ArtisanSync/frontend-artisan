import api from "@/lib/api";

export const AuthService = {
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgotpassword", { email });
    return { ...response.data, email };
  },

  verifyOtp: async (email, otp) => {
    const response = await api.post("/auth/verify-otp", { email, otp });
    return response.data;
  },

  resetPassword: async (resetToken, password) => {
    const response = await api.put("/auth/reset-password", {
      resetToken,
      password,
    });
    return response.data;
  },
};
