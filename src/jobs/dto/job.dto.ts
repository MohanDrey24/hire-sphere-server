import { z } from 'zod';

export const jobSchema = z.object({
  id: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  salary: z.number().optional(),
  isAvailable: z.boolean().optional().default(true),
  createdAt: z.string().date().optional(),
});

export type JobDTO = z.infer<typeof jobSchema>;

export const updateJobSchema = z
  .object({
    id: z.string(),
    updatedJob: jobSchema,
  })
  .required();

export type UpdateJobDTO = z.infer<typeof updateJobSchema>;
