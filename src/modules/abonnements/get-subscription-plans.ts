import { getDb } from "@/db/client";
import { subscriptionPlans } from "@/db/schema";
import { SUBSCRIPTION_TIERS, type SubscriptionTier } from "./types";

export type SubscriptionPlan = {
  tier: SubscriptionTier;
  priceXaf: number;
  liveIncluded: boolean;
  isActive: boolean;
};

/** Always returns exactly one row per tier, defaulting to price 0 /
 * inactive for any tier the admin hasn't configured yet. */
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const rows = await getDb().select().from(subscriptionPlans);
  const byTier = new Map(rows.map((row) => [row.tier, row]));

  return SUBSCRIPTION_TIERS.map((tier) => {
    const row = byTier.get(tier);
    return {
      tier,
      priceXaf: row?.priceXaf ?? 0,
      liveIncluded: row?.liveIncluded ?? false,
      isActive: row?.isActive ?? false,
    };
  });
}
