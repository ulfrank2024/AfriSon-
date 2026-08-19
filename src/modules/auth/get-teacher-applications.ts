import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { teacherApplications } from "@/db/schema";
import type { ApplicationStatus } from "./types";

export async function getTeacherApplications(status?: ApplicationStatus) {
  const db = getDb();

  if (status) {
    return db
      .select()
      .from(teacherApplications)
      .where(eq(teacherApplications.status, status))
      .orderBy(desc(teacherApplications.createdAt));
  }

  return db
    .select()
    .from(teacherApplications)
    .orderBy(desc(teacherApplications.createdAt));
}
