import { describe, expect, it } from "vitest";
import { MAX_CONTEXT_LENGTH } from "./constants";
import { categorySchema, generateExcuseSchema, toneSchema } from "./schemas";

describe("categorySchema", () => {
  it("accepts valid categories", () => {
    expect(categorySchema.parse("meeting")).toBe("meeting");
    expect(categorySchema.parse("something_else")).toBe("something_else");
  });

  it("rejects invalid categories", () => {
    expect(() => categorySchema.parse("vacation")).toThrow();
    expect(() => categorySchema.parse("")).toThrow();
  });
});

describe("toneSchema", () => {
  it("accepts valid tones", () => {
    expect(toneSchema.parse("believable")).toBe("believable");
    expect(toneSchema.parse("completely_unhinged")).toBe("completely_unhinged");
  });

  it("rejects invalid tones", () => {
    expect(() => toneSchema.parse("sarcastic")).toThrow();
  });
});

describe("generateExcuseSchema", () => {
  it("accepts a valid payload", () => {
    const result = generateExcuseSchema.parse({
      category: "meeting",
      tone: "corporate",
      context: "  Board sync at 3pm  ",
    });

    expect(result).toEqual({
      category: "meeting",
      tone: "corporate",
      context: "Board sync at 3pm",
    });
  });

  it("treats blank context as undefined", () => {
    const result = generateExcuseSchema.parse({
      category: "deadline",
      tone: "believable",
      context: "   ",
    });

    expect(result.context).toBeUndefined();
  });

  it("rejects context over the character limit", () => {
    const result = generateExcuseSchema.safeParse({
      category: "exercise",
      tone: "dramatic",
      context: "x".repeat(MAX_CONTEXT_LENGTH + 1),
    });

    expect(result.success).toBe(false);
  });

  it("rejects missing required enums", () => {
    const result = generateExcuseSchema.safeParse({
      context: "hello",
    });

    expect(result.success).toBe(false);
  });
});
