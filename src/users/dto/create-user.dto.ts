import { z } from 'zod';

export const usersSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
});

export type CreateUserDTO = z.infer<typeof usersSchema>;
