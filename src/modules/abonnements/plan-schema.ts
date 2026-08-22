import { z } from "zod";
import { SUBSCRIPTION_TIERS } from "./types";

export const savePlanSchema = z.object({
  tier: z.enum(SUBSCRIPTION_TIERS),
  priceXaf: z.coerce.number().int().min(0).max(1_000_000),
  liveIncluded: z.coerce.boolean(),
  isActive: z.coerce.boolean(),
});
