import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});

export const signUpSchema = signInSchema.extend({
  lastname: z.string().trim().min(2).max(255).optional().or(z.literal("")),
  firstname: z.string().trim().min(2).max(255),
  username: z.string().trim().min(6).max(36),
  verifyPassword: z.string().trim().min(8),
});

export type ISignIn = z.infer<typeof signInSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
