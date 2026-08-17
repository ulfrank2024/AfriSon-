export const SUBSCRIPTION_TIERS = ["decouverte", "standard", "premium"] as const;
export type SubscriptionTier = (typeof SUBSCRIPTION_TIERS)[number];

export const SUBSCRIPTION_STATUSES = [
  "active",
  "en_attente",
  "expiree",
  "annulee",
] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

export type Subscription = {
  id: string;
  studentId: string;
  tier: SubscriptionTier;
  price: number;
  currency: string;
  status: SubscriptionStatus;
  startedAt: Date | null;
  endsAt: Date | null;
};

/** Revenue split applied when a subscription payment is reconciled.
 * See CLAUDE.md "Répartition des revenus" — teacher share for a
 * standard subscription is 60-70%, platform keeps the rest. */
export const STANDARD_SUBSCRIPTION_TEACHER_SHARE = 0.65;
export const LIVE_SESSION_TEACHER_SHARE = 0.7;
