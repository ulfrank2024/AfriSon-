import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { announcementAudienceEnum } from "./enums";
import { users } from "./users";

export const announcements = pgTable("announcements", {
  id: uuid("id").primaryKey().defaultRandom(),
  authorId: uuid("author_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  body: text("body").notNull(),
  audience: announcementAudienceEnum("audience").notNull().default("tous"),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});
