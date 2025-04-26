"use client";

import { ReactQueryProvider } from "./ReactQueryProvider";

export function Providers({ children }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
