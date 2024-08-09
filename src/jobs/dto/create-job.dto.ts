import { z } from 'zod';

export const createJobSchema = z.object({
  jobId: z.string().uuid().optional(),
  company: z.string(),
  position: z.string(),
  location: z.string(),
  country: z.string(),
  salary: z.number(),
  isAvailable: z.boolean().optional(),
  createdAt: z.string().date().optional(),
  updatedAt: z.string().date().optional(),
});

export type CreateJobDTO = z.infer<typeof createJobSchema>;
