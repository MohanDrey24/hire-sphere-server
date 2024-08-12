import { z } from 'zod';
import { createJobSchema } from './create-job.dto';

export type UpdateJobDTO = z.infer<typeof createJobSchema>;
