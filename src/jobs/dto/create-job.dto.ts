import { z } from 'zod';

export const createJobSchema = z.object({
  company: z.object({
    connect: z.object({
      id: z.string().uuid(),
    }),
  }),
  position: z.string().min(1),
  type: z.enum(['HYBRID', 'REMOTE', 'ONSITE']),
  country: z.string().optional(),
  salary: z.number().positive(),
  isAvailable: z.boolean().default(true),
  description: z.string().optional(),
});

export type CreateJobDTO = z.infer<typeof createJobSchema>;
