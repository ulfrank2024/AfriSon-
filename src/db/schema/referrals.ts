import { pgTable, uuid, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { referralStatusEnum } from "./enums";
import { users } from "./users";

/**
 * referredId is unique: a user can be the beneficiary of exactly one
 * referral. Chain depth (parrain -> filleul -> filleul du filleul) is
 * capped at 2 levels in application logic, never stored as cascading rows.
 */
export const referrals = pgTable(
  "referrals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    referrerId: uuid("referrer_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    referredId: uuid("referred_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    code: text("code").notNull(),
    status: referralStatusEnum("status").notNull().default("en_attente"),
    reward: text("reward"),
    triggeredAt: timestamp("triggered_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex("referrals_referred_id_idx").on(table.referredId)],
);
