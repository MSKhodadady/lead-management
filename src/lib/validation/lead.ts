import { z } from "zod";

//: name and email form
export const leadFormNESchema = z.object({
  name: z.string().nonempty({ message: "Please enter your name" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .nonempty({ message: "Please enter your email" }),
});
export type LeadFormNE = z.infer<typeof leadFormNESchema>;

//: inquiry form
export const inquiryOptions = ["Google", "Social Media", "Friends"] as const;
export const leadFormInquirySchema = z.object({
  inquiry: z.enum(inquiryOptions),
});
export type LeadFormInquiry = z.infer<typeof leadFormInquirySchema>;

export const leadCreateSchema = leadFormNESchema.merge(leadFormInquirySchema);

export type LeadCreate = z.infer<typeof leadCreateSchema>;
