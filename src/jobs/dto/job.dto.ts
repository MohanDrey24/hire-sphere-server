import { z } from 'zod';

export const jobSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  salary: z.number().optional(),
  isAvailable: z.boolean().optional().default(true),
  createdAt: z.string().date().optional(),
});

export type JobDTO = z.infer<typeof jobSchema>;
