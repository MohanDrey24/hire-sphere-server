import { z } from "zod";

export const UpdateUserSchema = z
  .object({
    name: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  })
  .partial();

export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;
