import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["payload"],
        ignoredPaths: ["payload"],
      },
    }),
});
