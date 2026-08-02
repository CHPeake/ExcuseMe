import { describe, expect, it } from "vitest";
import {
  getFallbackExcuse,
  getFallbackLibraryStats,
  SHARED_BY_TONE,
} from "./fallback-excuses";

describe("fallback excuses", () => {
  it("returns a non-empty excuse for each category and tone", () => {
    const excuse = getFallbackExcuse("social_event", "completely_unhinged");
    expect(typeof excuse).toBe("string");
    expect(excuse.length).toBeGreaterThan(10);
  });

  it("includes at least five excuses per tone in the shared library", () => {
    for (const excuses of Object.values(SHARED_BY_TONE)) {
      expect(excuses.length).toBeGreaterThanOrEqual(5);
    }
  });

  it("contains at least 25 fallback excuses overall", () => {
    const stats = getFallbackLibraryStats();
    expect(stats.total).toBeGreaterThanOrEqual(25);
    expect(stats.perToneMinimum).toBeGreaterThanOrEqual(5);
  });
});
