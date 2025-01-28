"use client";

import { MainLayout } from "@/components/layout/Main";
import { H1 } from "@/components/typography/H1";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
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
  name: z.string().nonempty({ message: "Please enter your name" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .nonempty({ message: "Please enter your email" }),
});

type FormType = z.infer<typeof formSchema>;

export default function CreateLeadPage() {
  const [activeStep, setActiveStep] = useState(1);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  function onSubmit(values: FormType) {
    setActiveStep(2);
  }

  return (
    <MainLayout className="items-start px-8 ">
      <title>Create Lead</title>
      <H1 className="text-2xl lg:text-2xl text-center w-full">Create Lead</H1>

      <Stepper steps={["1", "2", "3"]} active={activeStep} />

      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`w-full flex flex-col gap-6 ${
            activeStep == 1 ? "" : "hidden"
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
                <FormDescription>{errors.name?.message ?? ""}</FormDescription>
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
                <FormDescription>{errors.email?.message ?? ""}</FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Next Step
          </Button>
        </form>
      </FormProvider>

      <div className={`${activeStep == 2 ? "" : "hidden"}`}></div>
    </MainLayout>
  );
}
