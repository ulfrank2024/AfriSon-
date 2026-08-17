import { describe, expect, it } from "vitest";
import { splitLiveSessionRevenue, splitSubscriptionRevenue } from "./revenue-split";

describe("splitSubscriptionRevenue", () => {
  it("gives the teacher 65% and the platform the remainder", () => {
    expect(splitSubscriptionRevenue(10_000)).toEqual({
      teacherAmount: 6_500,
      platformAmount: 3_500,
    });
  });

  it("never lets the two shares exceed the original amount", () => {
    const { teacherAmount, platformAmount } = splitSubscriptionRevenue(9_999);
    expect(teacherAmount + platformAmount).toBe(9_999);
  });

  it("rejects a negative amount", () => {
    expect(() => splitSubscriptionRevenue(-1)).toThrow();
  });
});

describe("splitLiveSessionRevenue", () => {
  it("gives the teacher 70% and the platform the remainder", () => {
    expect(splitLiveSessionRevenue(10_000)).toEqual({
      teacherAmount: 7_000,
      platformAmount: 3_000,
    });
  });
});
