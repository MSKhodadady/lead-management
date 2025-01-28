"use client";

import { MainLayout } from "@/components/layout/Main";
import { H1 } from "@/components/typography/H1";
import { H2 } from "@/components/typography/H2";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Stepper } from "@/components/ui/Stepper";
import { useToast } from "@/hooks/use-toast";
import { fetchJson } from "@/lib/fetchJson";
import {
  inquiryOptions,
  LeadFormInquiry,
  leadFormInquirySchema,
  LeadFormNE,
  leadFormNESchema,
} from "@/lib/validation/lead";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function CreateLeadPage() {
  const [activeStep, setActiveStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<LeadFormNE>({
    resolver: zodResolver(leadFormNESchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  function onSubmit() {
    setActiveStep(2);
  }

  const inqForm = useForm<LeadFormInquiry>({
    resolver: zodResolver(leadFormInquirySchema),
    defaultValues: {
      inquiry: "Google",
    },
  });

  async function onSubmitInquiry(v: LeadFormInquiry) {
    const body = {
      ...form.getValues(),
      ...v,
    };

    try {
      const res = await fetchJson("/api/lead", { method: "POST", body });

      if (res.ok) {
        setActiveStep(3);
      } else {
        toast({
          title: "Server Error",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Server Error",
      });
    }
  }

  return (
    <MainLayout className="items-start px-8 ">
      <title>Create Lead</title>
      <H1 className="text-2xl lg:text-2xl text-center w-full">Create Lead</H1>

      <Stepper steps={["1", "2", "3"]} active={activeStep} />

      {/* step 1 */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`w-full flex flex-col gap-6 ${
            activeStep == 1 ? "" : "hidden"
          }`}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="enter your name ..." {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.name?.message ?? ""}
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="enter your email ..." {...field} />
                </FormControl>
                <FormDescription>
                  {form.formState.errors.email?.message ?? ""}
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Next Step
          </Button>
        </form>
      </FormProvider>

      {/* step 2 */}

      <FormProvider {...inqForm}>
        <form
          onSubmit={inqForm.handleSubmit(onSubmitInquiry)}
          className={`w-full ${activeStep == 2 ? "" : "hidden"}`}
        >
          <FormField
            control={inqForm.control}
            name="inquiry"
            render={({ field }) => (
              <FormItem className="mb-8">
                <FormLabel>Inquiry Source:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="gap-3 "
                  >
                    {inquiryOptions.map((option) => (
                      <FormItem
                        className="flex items-center gap-2 space-y-0"
                        key={option}
                      >
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal">{option}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-stretch gap-3">
            <Button
              type="button"
              onClick={() => setActiveStep(1)}
              className="w-full"
              variant="secondary"
            >
              Pre Step
            </Button>
            <Button type="submit" className="w-full font-bold text-lg">
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>

      <div
        className={`w-full ${
          activeStep == 3 ? "" : "hidden"
        } flex flex-col items-center gap-8`}
      >
        <CircleCheckBig color="green" size={60} />
        <H2>You lead submitted successfully!</H2>
        <Link href={"/"}>
          <Button type="button">Back Home</Button>
        </Link>
      </div>
    </MainLayout>
  );
}
