export type Category =
  | "meeting"
  | "deadline"
  | "social_event"
  | "exercise"
  | "phone_call"
  | "something_else";

export type Tone =
  | "believable"
  | "corporate"
  | "dramatic"
  | "unnecessarily_detailed"
  | "completely_unhinged";

export type GenerateExcuseInput = {
  category: Category;
  tone: Tone;
  context?: string;
};

export type GenerateExcuseResult = {
  excuse: string;
  category: Category;
  tone: Tone;
  reference: string;
  generatedAt: string;
  usedFallback: boolean;
};

export type UiState = "form" | "submitting" | "result" | "error";
