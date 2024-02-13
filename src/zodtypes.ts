import { z } from "zod";

// AUTHENTICATION

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Types
export type TResetPassword = z.infer<typeof resetPasswordSchema>;

/**************************************************************************/
