import { ReactNode } from "react";

export function H1(P: { children: ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {P.children}
    </h1>
  );
}
