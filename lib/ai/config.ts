export const AI_CONFIG = {
  /** Fast, inexpensive model for short excuse generation. */
  model: "gpt-4o-mini",
  maxTokens: 120,
  temperature: 0.9,
  timeoutMs: 12_000,
} as const;
