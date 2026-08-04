export const AI_CONFIG = {
  /** Cost-efficient GPT-5.6 model for short excuse generation. */
  model: "gpt-5.6-luna",
  maxTokens: 120,
  temperature: 0.9,
  timeoutMs: 12_000,
} as const;
