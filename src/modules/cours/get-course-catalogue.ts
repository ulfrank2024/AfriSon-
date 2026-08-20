import { eq, and, desc, count, avg, inArray, type SQL } from "drizzle-orm";
import { getDb } from "@/db/client";
import { courses, lessons, users, courseRatings } from "@/db/schema";
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

  const results = await db
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

  if (results.length === 0) return [];

  const ratingRows = await db
    .select({
      courseId: courseRatings.courseId,
      average: avg(courseRatings.rating),
      count: count(courseRatings.id),
    })
    .from(courseRatings)
    .where(inArray(courseRatings.courseId, results.map((r) => r.id)))
    .groupBy(courseRatings.courseId);

  const ratingsByCourse = new Map(
    ratingRows.map((r) => [r.courseId, { average: Number(r.average), count: r.count }]),
  );

  return results.map((course) => ({
    ...course,
    averageRating: ratingsByCourse.get(course.id)?.average ?? null,
    ratingCount: ratingsByCourse.get(course.id)?.count ?? 0,
  }));
}
