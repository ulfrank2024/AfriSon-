import { eq, and, desc, count, type SQL } from "drizzle-orm";
import { getDb } from "@/db/client";
import { courses, lessons, users } from "@/db/schema";
import type { CourseCatalogueFilters } from "./types";

export async function getCourseCatalogue(filters: CourseCatalogueFilters) {
  const db = getDb();

  const conditions: SQL[] = [eq(courses.status, "publie")];
  if (filters.teachingLanguage) {
    conditions.push(eq(courses.teachingLanguage, filters.teachingLanguage));
  }
  if (filters.level) {
    conditions.push(eq(courses.level, filters.level));
  }

  return db
    .select({
      id: courses.id,
      title: courses.title,
      specialty: courses.specialty,
      level: courses.level,
      teachingLanguage: courses.teachingLanguage,
      teacherName: users.fullName,
      lessonCount: count(lessons.id),
    })
    .from(courses)
    .innerJoin(users, eq(users.id, courses.teacherId))
    .leftJoin(lessons, eq(lessons.courseId, courses.id))
    .where(and(...conditions))
    .groupBy(courses.id, users.fullName)
    .orderBy(desc(courses.createdAt));
}
