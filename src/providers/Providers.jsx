"use client";

import { ReactQueryProvider } from "./ReactQueryProvider";
import { Provider } from "react-redux";
import { store } from "@/features/store";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </Provider>
  );
}
