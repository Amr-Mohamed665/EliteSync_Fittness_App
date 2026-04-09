import * as zod from "zod";

export const ChangePasswordSchema = zod
  .object({
    CurrentPassword: zod
      .string()
      .nonempty("Current Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Use at least 8 characters including letters, numbers, and a special symbol",
      ),

    NewPassword: zod
      .string()
      .nonempty("New Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Use at least 8 characters including letters, numbers, and a special symbol",
      ),
    ConfirmNewPassword: zod.string().nonempty("Confirm New Password is required"),
  })
  .refine((data) => data.NewPassword === data.ConfirmNewPassword, {
    path: ["ConfirmNewPassword"],
    message: "New Password and Confirm New Password moust be the same",
  });

export type ChangePasswordFormData = zod.infer<typeof ChangePasswordSchema>;
