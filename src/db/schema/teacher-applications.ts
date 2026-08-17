import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { applicationStatusEnum, teacherFieldEnum, teachingLanguageEnum } from "./enums";
import { users } from "./users";

export const teacherApplications = pgTable("teacher_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  field: teacherFieldEnum("field").notNull(),
  teachingLanguages: teachingLanguageEnum("teaching_languages")
    .array()
    .notNull(),
  status: applicationStatusEnum("status").notNull().default("recu"),
  documents: jsonb("documents").$type<string[]>().notNull().default([]),
  internalNotes: text("internal_notes"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
