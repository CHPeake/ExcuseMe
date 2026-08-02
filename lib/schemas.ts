import { z } from "zod";
import { MAX_CONTEXT_LENGTH } from "./constants";

export const categorySchema = z.enum([
  "meeting",
  "deadline",
  "social_event",
  "exercise",
  "phone_call",
  "something_else",
]);

export const toneSchema = z.enum([
  "believable",
  "corporate",
  "dramatic",
  "unnecessarily_detailed",
  "completely_unhinged",
]);

export const generateExcuseSchema = z.object({
  category: categorySchema,
  tone: toneSchema,
  context: z
    .string()
    .trim()
    .max(MAX_CONTEXT_LENGTH, {
      message: `Context must be ${MAX_CONTEXT_LENGTH} characters or fewer.`,
    })
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
});

export type GenerateExcuseSchemaInput = z.infer<typeof generateExcuseSchema>;
