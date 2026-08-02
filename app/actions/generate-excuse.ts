"use server";

import { generateExcuse } from "@/lib/ai/generate";
import { GENERIC_ERROR_MESSAGE } from "@/lib/constants";
import { generateExcuseSchema } from "@/lib/schemas";
import type { GenerateExcuseResult } from "@/lib/types";

export type GenerateExcuseActionResult =
  | { ok: true; data: GenerateExcuseResult }
  | { ok: false; error: string };

export async function generateExcuseAction(
  input: unknown,
): Promise<GenerateExcuseActionResult> {
  const parsed = generateExcuseSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: GENERIC_ERROR_MESSAGE,
    };
  }

  try {
    const data = await generateExcuse(parsed.data);
    return { ok: true, data };
  } catch (error) {
    console.error("Unexpected generateExcuseAction failure:", error);
    return {
      ok: false,
      error: GENERIC_ERROR_MESSAGE,
    };
  }
}
