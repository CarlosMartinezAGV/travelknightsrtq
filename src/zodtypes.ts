import { z } from "zod";
// AUTHENTICATION
export const loginCredentialsSchema = z.object({
  email: z.string().min(1, "Invalid Email").email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpCredentialsSchema = loginCredentialsSchema
  .extend({
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TSignUpCredentials = z.infer<typeof signUpCredentialsSchema>;
export type TLoginCredentials = z.infer<typeof loginCredentialsSchema>;
