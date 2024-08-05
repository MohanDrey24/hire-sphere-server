import { z } from 'zod';

export const JobQuerySchema = z
  .object({
    id: z.string().uuid(),
    company: z.string(),
    position: z.string(),
    location: z.string(),
    country: z.string(),
    salary: z.preprocess((val) => Number(val), z.number().nonnegative()),
    isAvailable: z.preprocess((val) => val === 'true', z.boolean()),
  })
  .partial();

export type JobQueryDTO = z.infer<typeof JobQuerySchema>;
