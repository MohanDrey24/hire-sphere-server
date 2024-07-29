import { z } from 'zod';

export const jobSchema = z.object({
  id: z.string().uuid().optional(),
  company: z.string(),
  position: z.string(),
  location: z.string().optional(),
  country: z.string().optional(),
  salary: z.number(),
  isAvailable: z.boolean(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export type JobDTO = z.infer<typeof jobSchema>;
