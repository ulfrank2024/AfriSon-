import { pgTable, uuid, integer, boolean, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { subscriptionTierEnum } from "./enums";

/** Admin-configurable pricing per tier (see cahier des charges §"Paramétrage
 * des offres"). One row per tier — the student-facing page reads current
 * prices from here rather than any hardcoded value. */
export const subscriptionPlans = pgTable(
  "subscription_plans",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tier: subscriptionTierEnum("tier").notNull(),
    priceXaf: integer("price_xaf").notNull().default(0),
    liveIncluded: boolean("live_included").notNull().default(false),
    isActive: boolean("is_active").notNull().default(false),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("subscription_plans_tier_idx").on(table.tier)],
);
