import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod
    .string()
    .nonempty("email is required")
    .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "invalid email"),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*\d).{8,}$/,
      "Password must be at least 8 characters and include at least one number",
    ),
});
