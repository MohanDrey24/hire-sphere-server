import { z } from 'zod';

export const JobQuerySchema = z
  .object({
    id: z.string().uuid(),
    type: z.enum(['HYBRID', 'REMOTE', 'ONSITE']),
    country: z.string(),
  })
  .partial();

export type JobQueryDTO = z.infer<typeof JobQuerySchema>;
