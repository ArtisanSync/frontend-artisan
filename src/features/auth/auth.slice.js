import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resetStep: "email", // 'email', 'otp', 'password', 'success'
  isLoading: false,
  error: null,
  success: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetPasswordState: (state) => {
      state.resetStep = "email";
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
    setResetStep: (state, action) => {
      state.resetStep = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setSuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
      state.isLoading = false;
    },
  },
});

export const {
  resetPasswordState,
  setResetStep,
  clearAuthError,
  setLoading,
  setError,
  setSuccess,
} = authSlice.actions;

export default authSlice.reducer;
