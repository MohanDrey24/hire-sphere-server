import * as z from "zod";

export const autocompleteSchema = z
  .object({
    position: z.string(),
    name: z.string(),
  })
  .partial();

export type AutocompleteDTO = z.infer<typeof autocompleteSchema>;
