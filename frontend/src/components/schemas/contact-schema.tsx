

import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.union([z.string(), z.number()]).optional().transform(String),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  country: z.object({
    value: z.string(),
    label: z.string(),
  }).optional(),
  
  jobDetails: z.string().optional(),
});

  
  export type ContactFormValues = z.infer<typeof ContactSchema>;
  