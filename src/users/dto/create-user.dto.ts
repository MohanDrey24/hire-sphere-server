import { z } from 'zod';

export const usersSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export type CreateUserDTO = z.infer<typeof usersSchema>;
