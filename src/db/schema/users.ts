import { pgTable, uuid, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { interfaceLanguageEnum, userRoleEnum } from "./enums";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").notNull(),
    role: userRoleEnum("role").notNull().default("eleve"),
    fullName: text("full_name").notNull(),
    country: text("country").notNull(),
    interfaceLanguage: interfaceLanguageEnum("interface_language")
      .notNull()
      .default("fr"),
    email: text("email"),
    phone: text("phone"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("users_clerk_id_idx").on(table.clerkId),
    uniqueIndex("users_email_idx").on(table.email),
  ],
);
