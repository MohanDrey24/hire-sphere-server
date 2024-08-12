import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  website: z.string().url().optional(),
});

export type CreateCompanyDTO = z.infer<typeof createCompanySchema>;
