import { describe, expect, it } from "vitest";
import { validateExcuseOutput } from "./validate-output";

describe("validateExcuseOutput", () => {
  it("accepts a short usable excuse", () => {
    const result = validateExcuseOutput(
      "I can’t make it tonight. Something unexpected came up at home.",
    );

    expect(result).toEqual({
      ok: true,
      excuse: "I can’t make it tonight. Something unexpected came up at home.",
    });
  });

  it("rejects empty output", () => {
    expect(validateExcuseOutput("   ").ok).toBe(false);
  });

  it("rejects excuses over the word limit", () => {
    const words = Array.from({ length: 70 }, () => "word").join(" ");
    const result = validateExcuseOutput(words);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("word_limit");
    }
  });

  it("rejects system-message openings", () => {
    const result = validateExcuseOutput("Here is your excuse: I am busy.");
    expect(result.ok).toBe(false);
  });

  it("rejects markdown headings", () => {
    const result = validateExcuseOutput("## Excuse\nI am unavailable.");
    expect(result.ok).toBe(false);
  });

  it("rejects prohibited high-risk themes", () => {
    const result = validateExcuseOutput(
      "I can’t come because there was a bomb scare nearby.",
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("prohibited_theme");
    }
  });

  it("strips surrounding quotation marks", () => {
    const result = validateExcuseOutput(
      "“My hallway has developed a weather system.”",
    );

    expect(result).toEqual({
      ok: true,
      excuse: "My hallway has developed a weather system.",
    });
  });
});
