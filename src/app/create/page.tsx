"use client";

import { MainLayout } from "@/components/layout/Main";
import { H1 } from "@/components/typography/H1";
import { Stepper } from "@/components/ui/Stepper";
import { useState } from "react";

export default function CreateLeadPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <MainLayout className="items-start px-4 gap-6">
      <H1 className="text-2xl lg:text-2xl text-center w-full">Create Lead</H1>

      <Stepper steps={["1", "2", "3"]} active={activeStep} />

      <div></div>
    </MainLayout>
  );
}
