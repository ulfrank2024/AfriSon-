import {
  pgTable,
  uuid,
  text,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const partnerInstitutions = pgTable("partner_institutions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  offer: text("offer").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const partnerInstitutionMembers = pgTable(
  "partner_institution_members",
  {
    partnerInstitutionId: uuid("partner_institution_id")
      .notNull()
      .references(() => partnerInstitutions.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.partnerInstitutionId, table.userId] }),
  ],
);
