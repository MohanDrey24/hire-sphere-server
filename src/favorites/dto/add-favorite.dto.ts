import { z } from "zod";

export const AddFavoriteSchema = z.object({
  jobId: z.string().uuid(),
});

export type AddFavoriteDTO = z.infer<typeof AddFavoriteSchema>;
