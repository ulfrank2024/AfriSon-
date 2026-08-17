import { describe, expect, it } from "vitest";
import {
  eligibleReferrersForReward,
  isReferralRewardEligible,
  isValidReferral,
} from "./rules";

describe("isReferralRewardEligible", () => {
  it("rejects a reward triggered by account creation alone", () => {
    expect(isReferralRewardEligible(false)).toBe(false);
  });

  it("allows a reward once the referred user actually pays for a subscription", () => {
    expect(isReferralRewardEligible(true)).toBe(true);
  });
});

describe("isValidReferral", () => {
  it("rejects self-referral", () => {
    expect(isValidReferral("user-1", "user-1")).toBe(false);
  });

  it("accepts a referral between two distinct users", () => {
    expect(isValidReferral("user-1", "user-2")).toBe(true);
  });
});

describe("eligibleReferrersForReward", () => {
  it("caps payouts at 2 levels, never cascading further like an MLM", () => {
    const chain = ["parrain-direct", "parrain-du-parrain", "niveau-3", "niveau-4"];
    expect(eligibleReferrersForReward(chain)).toEqual([
      "parrain-direct",
      "parrain-du-parrain",
    ]);
  });

  it("returns the full chain when it's shorter than the cap", () => {
    expect(eligibleReferrersForReward(["seul-parrain"])).toEqual(["seul-parrain"]);
  });
});
