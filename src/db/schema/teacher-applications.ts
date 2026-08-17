import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { applicationStatusEnum, teacherFieldEnum, teachingLanguageEnum } from "./enums";
import { users } from "./users";

/**
 * userId is nullable: applicants apply from the public recruitment form
 * before creating an account. It gets linked once the application is
 * validated and the teacher account is activated.
 */
export const teacherApplications = pgTable("teacher_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  country: text("country").notNull(),
  field: teacherFieldEnum("field").notNull(),
  teachingLanguages: teachingLanguageEnum("teaching_languages")
    .array()
    .notNull(),
  motivation: text("motivation").notNull(),
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
