import { z } from 'zod';

export const usersSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .required();

export type CreateUserDTO = z.infer<typeof usersSchema>;
