import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function H2(P: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("scroll-m-20 pb-2 text-3xl font-semibold", P.className)}>
      {P.children}
    </h2>
  );
}
