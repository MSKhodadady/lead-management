import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function H1(P: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight",
        P.className
      )}
    >
      {P.children}
    </h1>
  );
}
