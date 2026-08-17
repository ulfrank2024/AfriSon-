import { pgTable, uuid, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { courses } from "./courses";

export const liveSessions = pgTable("live_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  teacherId: uuid("teacher_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  agoraChannel: text("agora_channel").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const liveSessionParticipants = pgTable(
  "live_session_participants",
  {
    liveSessionId: uuid("live_session_id")
      .notNull()
      .references(() => liveSessions.id, { onDelete: "cascade" }),
    studentId: uuid("student_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    registeredAt: timestamp("registered_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.liveSessionId, table.studentId] }),
  ],
);
