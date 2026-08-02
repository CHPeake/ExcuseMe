import { afterEach, describe, expect, it, vi } from "vitest";

const createMock = vi.fn();

vi.mock("openai", () => {
  class OpenAI {
    chat = {
      completions: {
        create: createMock,
      },
    };
  }

  return { default: OpenAI };
});

describe("generateExcuse", () => {
  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    delete process.env.OPENAI_API_KEY;
  });

  it("uses a fallback when the API key is missing", async () => {
    const { generateExcuse } = await import("./generate");

    const result = await generateExcuse({
      category: "meeting",
      tone: "believable",
    });

    expect(result.usedFallback).toBe(true);
    expect(result.excuse.length).toBeGreaterThan(10);
    expect(result.category).toBe("meeting");
    expect(result.tone).toBe("believable");
    expect(result.reference).toMatch(/^EX-\d{4}-\d{5}$/);
  });

  it("uses a fallback when model output fails validation", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    createMock.mockResolvedValue({
      choices: [
        {
          message: {
            content: "Here is your excuse: I cannot attend because of a bomb threat.",
          },
        },
      ],
    });

    const { generateExcuse } = await import("./generate");

    const result = await generateExcuse({
      category: "deadline",
      tone: "corporate",
      context: "quarterly report",
    });

    expect(result.usedFallback).toBe(true);
    expect(result.excuse).not.toMatch(/bomb/i);
  });

  it("returns validated model output when generation succeeds", async () => {
    process.env.OPENAI_API_KEY = "test-key";
    createMock.mockResolvedValue({
      choices: [
        {
          message: {
            content:
              "I won’t be able to join. Something unexpected came up at home and I need to stay put.",
          },
        },
      ],
    });

    const { generateExcuse } = await import("./generate");

    const result = await generateExcuse({
      category: "phone_call",
      tone: "believable",
    });

    expect(result.usedFallback).toBe(false);
    expect(result.excuse).toContain("Something unexpected came up");
  });
});
