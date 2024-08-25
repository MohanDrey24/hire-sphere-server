import { z } from 'zod';

export const AddFavoriteSchema = z.object({
  user: z.object({
    connect: z.object({
      id: z.string().uuid(),
    }),
  }),
  job: z.object({
    connect: z.object({
      id: z.string().uuid(),
    }),
  }),
})

export type AddFavoriteDTO = z.infer<typeof AddFavoriteSchema>;