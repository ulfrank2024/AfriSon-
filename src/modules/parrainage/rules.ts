import { MAX_REFERRAL_LEVELS } from "./types";

/** A referral reward is only ever triggered by a real paid subscription
 * — never by account creation alone. */
export function isReferralRewardEligible(isPaidSubscription: boolean): boolean {
  return isPaidSubscription;
}

/** A user can't refer themselves, directly or via a code lookup bug. */
export function isValidReferral(referrerId: string, referredId: string): boolean {
  return referrerId !== referredId;
}

/**
 * Given the chain of referrers above a user who just triggered a
 * reward (immediate referrer first, then their own referrer, ...),
 * returns only the referrers eligible for a payout under the
 * platform's 1-2 level cap. Anything beyond that depth is intentionally
 * dropped, never paid.
 */
export function eligibleReferrersForReward(referrerChain: readonly string[]): string[] {
  return referrerChain.slice(0, MAX_REFERRAL_LEVELS);
}
