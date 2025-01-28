"use client";

import { MainLayout } from "@/components/layout/Main";
import { H1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Stepper } from "@/components/ui/Stepper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  inquirySource: z.string(),
});

type FormType = z.infer<typeof formSchema>;

export default function CreateLeadPage() {
  const [activeStep, setActiveStep] = useState(1);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      inquirySource: "Google",
      name: "",
    },
  });
  const { handleSubmit, control } = form;

  function onSubmit(values: FormType) {}

  return (
    <MainLayout className="items-start px-8 ">
      <title>Create Lead</title>
      <H1 className="text-2xl lg:text-2xl text-center w-full">Create Lead</H1>

      <Stepper steps={["1", "2", "3"]} active={activeStep} />

      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`w-full flex flex-col gap-6 ${
            activeStep == 1 ? "" : "display-none"
          }`}
        >
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="enter your name ..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="enter your email ..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="button"
            className="w-full"
            onClick={() => setActiveStep(2)}
          >
            Next Step
          </Button>
        </form>
      </FormProvider>
    </MainLayout>
  );
}
