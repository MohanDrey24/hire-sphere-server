import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInDTO = z.infer<typeof signInSchema>;
