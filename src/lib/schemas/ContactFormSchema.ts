import { z } from "zod";

const ContactFormSchema = z.object({
  name: z.string().nonempty("Name is required").max(255, "Name is too long"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  subject: z
    .string()
    .nonempty("Subject is required")
    .max(255, "Subject is too long"),
  message: z
    .string()
    .nonempty("Message is required")
    .max(3000, "Message is too long it should be less than 3000 charachters"),
});

type ContactFormType = z.infer<typeof ContactFormSchema>;

export { type ContactFormType, ContactFormSchema };
