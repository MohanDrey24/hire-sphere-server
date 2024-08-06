import { z } from 'zod';

export const JobQuerySchema = z
  .object({
    id: z.string().uuid(),
    company: z.string(),
    position: z.string(),
    location: z.string(),
    country: z.string(),
  })
  .partial();

export type JobQueryDTO = z.infer<typeof JobQuerySchema>;
