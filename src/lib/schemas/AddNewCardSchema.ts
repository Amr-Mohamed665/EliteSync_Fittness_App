import { z } from "zod";

const isValidLuhn = (val: string) => {
  const sanitized = val.replace(/[- ]+/g, "");
  if (!/^\d{13,19}$/.test(sanitized)) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

// valid card 4573 7649 1901 7426

const AddNewCardSchema = z.object({
  cardType: z
    .string()
    .nonempty("Card type is required")
    .refine((val) => ["visa", "mastercard", "amex", "discover"].includes(val), {
      message: "Please select a valid card type",
    }),
  cardNumber: z
    .string()
    .nonempty("Card Number is required")
    .refine((val) => isValidLuhn(val), {
      message: "Invalid credit card number",
    }),
  month: z
    .string()
    .nonempty("Expiry is required")
    .regex(/^(0[1-9]|1[0-2])$/, "Valid MM format required"),
  year: z
    .string()
    .nonempty("Expiry is required")
    .regex(/^\d{4}$/, "Valid YYYY format required")
    .refine((val) => parseInt(val, 10) >= new Date().getFullYear(), {
      message: "Year cannot be in the past",
    }),
  cvv: z
    .string()
    .nonempty("CVV is required")
    .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  cardName: z
    .string()
    .nonempty("Card Name is required")
    .max(50, "Card Name is too long"),
}).superRefine((data, ctx) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // months are 0-11 in JS

  const expYear = parseInt(data.year, 10);
  const expMonth = parseInt(data.month, 10);

  if (!isNaN(expYear) && !isNaN(expMonth)) {
    if (expYear === currentYear && expMonth < currentMonth) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The expiry date must be in the future",
        path: ["month"], // Attach the error to the month field
      });
    }
  }
});

type AddNewCardType = z.infer<typeof AddNewCardSchema>;

export { type AddNewCardType, AddNewCardSchema };
