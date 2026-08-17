import { pgTable, uuid, integer, text, timestamp } from "drizzle-orm/pg-core";
import { paymentMethodEnum, paymentStatusEnum } from "./enums";
import { subscriptions } from "./subscriptions";

export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  subscriptionId: uuid("subscription_id")
    .notNull()
    .references(() => subscriptions.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("XAF"),
  method: paymentMethodEnum("method").notNull(),
  status: paymentStatusEnum("status").notNull().default("en_attente"),
  flutterwaveTxRef: text("flutterwave_tx_ref").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
