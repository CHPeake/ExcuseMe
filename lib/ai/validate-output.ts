import { MAX_EXCUSE_WORDS } from "../constants";
import { countWords } from "../utils";

const PROHIBITED_PATTERNS: RegExp[] = [
  /\b(kill|killed|killing|murder|suicide|self[-\s]?harm)\b/i,
  /\b(bomb|explode|explosion|terrorist|hostage)\b/i,
  /\b(overdose|cancer|heart attack|stroke|seizure)\b/i,
  /\b(missing child|abduct|kidnap|ransom)\b/i,
  /\b(police report|arrest warrant|court order|subpoena)\b/i,
  /\b(fraud|embezzle|money laundering|forged documents?)\b/i,
  /\b(i am (a |an )?(doctor|lawyer|police|officer|government official))\b/i,
  /\b(dead|died|death|funeral|funeral home)\b/i,
];

const SYSTEM_LEAK_PATTERNS: RegExp[] = [
  /^here (is|’s|'s) (your|an|the) excuse/i,
  /^sure[,!]?\s/i,
  /^as an ai\b/i,
  /\bopenai\b/i,
  /\bsystem prompt\b/i,
  /\bdepartment of no\b/i,
  /\bexcuse me\b/i,
  /^#{1,6}\s/,
  /```/,
  /\bprompt\b/i,
  /\bpolicy\b/i,
];

export type OutputValidationResult =
  | { ok: true; excuse: string }
  | { ok: false; reason: string };

export function validateExcuseOutput(raw: string): OutputValidationResult {
  const excuse = raw
    .trim()
    .replace(/^["“']+|["”']+$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!excuse) {
    return { ok: false, reason: "empty" };
  }

  if (countWords(excuse) > MAX_EXCUSE_WORDS) {
    return { ok: false, reason: "word_limit" };
  }

  if (excuse.length > 500) {
    return { ok: false, reason: "too_long" };
  }

  for (const pattern of SYSTEM_LEAK_PATTERNS) {
    if (pattern.test(excuse)) {
      return { ok: false, reason: "system_leak" };
    }
  }

  for (const pattern of PROHIBITED_PATTERNS) {
    if (pattern.test(excuse)) {
      return { ok: false, reason: "prohibited_theme" };
    }
  }

  return { ok: true, excuse };
}
