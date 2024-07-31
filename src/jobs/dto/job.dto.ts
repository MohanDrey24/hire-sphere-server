import { z } from 'zod';

export const jobSchema = z.object({
  id: z.string().uuid().optional(),
  company: z.string(),
  position: z.string(),
  location: z.string(),
  country: z.string(),
  salary: z.number(),
  isAvailable: z.boolean().optional(),
  createdAt: z.string().date().optional(),
  updatedAt: z.string().date().optional(),
});

export type CreateJobDTO = z.infer<typeof jobSchema>;

export type UpdateJobDTO = z.infer<typeof jobSchema>;
