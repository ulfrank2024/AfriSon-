import { pgTable, uuid, integer, text, timestamp } from "drizzle-orm/pg-core";
import { subscriptionStatusEnum, subscriptionTierEnum } from "./enums";
import { users } from "./users";

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tier: subscriptionTierEnum("tier").notNull(),
  price: integer("price").notNull(),
  currency: text("currency").notNull().default("XAF"),
  status: subscriptionStatusEnum("status").notNull().default("en_attente"),
  startedAt: timestamp("started_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
