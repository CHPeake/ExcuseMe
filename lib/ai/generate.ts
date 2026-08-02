import OpenAI from "openai";
import { getFallbackExcuse } from "../fallback-excuses";
import type { Category, GenerateExcuseResult, Tone } from "../types";
import { createReferenceNumber } from "../utils";
import { AI_CONFIG } from "./config";
import { buildSystemPrompt } from "./prompt";
import { validateExcuseOutput } from "./validate-output";

export type GenerateExcuseOptions = {
  category: Category;
  tone: Tone;
  context?: string;
};

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`OpenAI request timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error: unknown) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

async function requestModelExcuse(
  input: GenerateExcuseOptions,
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const client = new OpenAI({ apiKey });
  const completion = await withTimeout(
    client.chat.completions.create({
      model: AI_CONFIG.model,
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.maxTokens,
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(input),
        },
        {
          role: "user",
          content:
            "Write one short excuse only. Do not add labels, preface, or quotation marks.",
        },
      ],
    }),
    AI_CONFIG.timeoutMs,
  );

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Empty model response");
  }

  return content;
}

export async function generateExcuse(
  input: GenerateExcuseOptions,
): Promise<GenerateExcuseResult> {
  const reference = createReferenceNumber();
  const generatedAt = new Date().toISOString();

  try {
    const raw = await requestModelExcuse(input);
    const validated = validateExcuseOutput(raw);

    if (!validated.ok) {
      console.error("Excuse output failed validation:", validated.reason);
      return {
        excuse: getFallbackExcuse(input.category, input.tone),
        category: input.category,
        tone: input.tone,
        reference,
        generatedAt,
        usedFallback: true,
      };
    }

    return {
      excuse: validated.excuse,
      category: input.category,
      tone: input.tone,
      reference,
      generatedAt,
      usedFallback: false,
    };
  } catch (error) {
    console.error("Excuse generation failed:", error);

    return {
      excuse: getFallbackExcuse(input.category, input.tone),
      category: input.category,
      tone: input.tone,
      reference,
      generatedAt,
      usedFallback: true,
    };
  }
}
