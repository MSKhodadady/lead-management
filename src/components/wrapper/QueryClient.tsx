"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function QueryClientWrapper(P: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{P.children}</QueryClientProvider>
  );
}
