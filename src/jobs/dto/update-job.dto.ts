import { z } from 'zod';
import { createJobSchema } from './create-job.dto';

export const updateJobSchema = createJobSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type UpdateJobDTO = z.infer<typeof updateJobSchema>;
