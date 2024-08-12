import { z } from 'zod';

export const createJobSchema = z.object({
  company: z.object({
    connect: z.object({
      id: z.string().uuid(),
    }),
  }),
  position: z.string().min(1),
  location: z.enum(['HYBRID', 'REMOTE', 'ONSITE']),
  country: z.string().optional(),
  salary: z.number().positive(),
  isAvailable: z.boolean().default(true),
});

export type CreateJobDTO = z.infer<typeof createJobSchema>;
