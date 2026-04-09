import * as zod from "zod";
export const ForgotPasswordSchema = zod.object({
  email: zod
    .string()
    .nonempty("email is required")
    .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, "invalid email"),
});

export const ResetPasswordSchema = zod
  .object({
    password: zod
        .string()
        .nonempty("password is required")
        .regex(
          /^(?=.*\d).{8,}$/,
          "Password must be at least 8 characters and include at least one number",
        ),
    password_confirmation: zod.string().nonempty("rePassword is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "password and rePassword moust be the same",
  });
