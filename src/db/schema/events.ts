import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { eventTypeEnum } from "./enums";
import { users } from "./users";

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: eventTypeEnum("type").notNull(),
  country: text("country").notNull(),
  venue: text("venue").notNull(),
  date: timestamp("date", { withTimezone: true }).notNull(),
  capacity: integer("capacity").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const eventParticipants = pgTable(
  "event_participants",
  {
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    registeredAt: timestamp("registered_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.eventId, table.userId] })],
);
