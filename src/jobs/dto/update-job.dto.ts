import { z } from 'zod';

export const updateJobSchema = z
  .object({
    company: z.string(),
    position: z.string(),
    location: z.string(),
    country: z.string(),
    salary: z.number(),
    isAvailable: z.boolean(),
    createdAt: z.string().date(),
    updatedAt: z.string().date(),
  })
  .partial();

export type UpdateJobDTO = z.infer<typeof updateJobSchema>;
