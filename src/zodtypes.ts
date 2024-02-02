import { z } from "zod";
// AUTHENTICATION
export const loginCredentialsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type TLoginCredentials = z.infer<typeof loginCredentialsSchema>;
