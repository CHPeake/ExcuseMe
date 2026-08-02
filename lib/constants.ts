import type { Category, Tone } from "./types";

export const SITE_NAME = "Excuse Me";
export const SITE_TAGLINE = "Professionally generated reasons for absolutely anything.";
export const DEPARTMENT_NAME = "Department of No";
export const FORM_CODE = "Form EX-04B";
export const DIVISION_NAME = "Public Avoidance Division";
export const OFFICE_NAME = "Office of Plausible Explanations";

export const MAX_CONTEXT_LENGTH = 300;
export const MAX_EXCUSE_WORDS = 65;

export const CATEGORIES: ReadonlyArray<{
  value: Category;
  label: string;
}> = [
  { value: "meeting", label: "A meeting" },
  { value: "deadline", label: "A deadline" },
  { value: "social_event", label: "A social event" },
  { value: "exercise", label: "Exercise" },
  { value: "phone_call", label: "A phone call" },
  { value: "something_else", label: "Something else" },
] as const;

export const TONES: ReadonlyArray<{
  value: Tone;
  label: string;
  description: string;
}> = [
  {
    value: "believable",
    label: "Believable",
    description: "Sensible enough to send",
  },
  {
    value: "corporate",
    label: "Corporate",
    description: "Polished, vague, and fully aligned",
  },
  {
    value: "dramatic",
    label: "Dramatic",
    description: "Emotionally disproportionate",
  },
  {
    value: "unnecessarily_detailed",
    label: "Unnecessarily detailed",
    description: "More information than anyone requested",
  },
  {
    value: "completely_unhinged",
    label: "Completely unhinged",
    description: "Coherent enough to read, strange enough to remember",
  },
] as const;

export const LOADING_MESSAGES = [
  "Consulting the Department of Plausible Deniability…",
  "Verifying your lack of availability…",
  "Assigning responsibility elsewhere…",
  "Reviewing acceptable household emergencies…",
  "Removing unnecessary honesty…",
  "Making this sound less suspicious…",
  "Awaiting administrative approval…",
  "Adding a respectful amount of vagueness…",
] as const;

export const GENERIC_ERROR_MESSAGE =
  "The Department has misplaced your paperwork. Please submit it again.";

export const FALLBACK_NOTICE =
  "Generated using emergency departmental procedures.";

export const CATEGORY_LABELS: Record<Category, string> = {
  meeting: "A meeting",
  deadline: "A deadline",
  social_event: "A social event",
  exercise: "Exercise",
  phone_call: "A phone call",
  something_else: "Something else",
};

export const TONE_LABELS: Record<Tone, string> = {
  believable: "Believable",
  corporate: "Corporate",
  dramatic: "Dramatic",
  unnecessarily_detailed: "Unnecessarily detailed",
  completely_unhinged: "Completely unhinged",
};
