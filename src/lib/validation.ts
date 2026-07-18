import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message is too short").max(2000),
  // Honeypot field — real users never fill this in (it's visually hidden).
  // Bots that auto-fill every input will trip it.
  company: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
