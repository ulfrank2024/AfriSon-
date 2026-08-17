export const REFERRAL_STATUSES = ["en_attente", "recompense", "invalide"] as const;
export type ReferralStatus = (typeof REFERRAL_STATUSES)[number];

export type Referral = {
  id: string;
  referrerId: string;
  referredId: string;
  code: string;
  status: ReferralStatus;
  reward: string | null;
  triggeredAt: Date | null;
};

/**
 * Hard cap from CLAUDE.md: never pay out more than 2 levels deep
 * (parrain -> filleul -> filleul du filleul). Cascading beyond this is
 * what makes a referral program a pyramid scheme in several
 * jurisdictions — this constant is the single source of truth for
 * that limit, never re-derive it elsewhere.
 */
export const MAX_REFERRAL_LEVELS = 2;
