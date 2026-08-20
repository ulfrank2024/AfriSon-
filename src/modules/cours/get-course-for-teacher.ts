import { eq, and, asc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { courses, lessons } from "@/db/schema";

/** Fetches a course (any publish status) only if it belongs to the given teacher. */
export async function getCourseForTeacher(courseId: string, teacherId: string) {
  const db = getDb();

  const [course] = await db
    .select()
    .from(courses)
    .where(and(eq(courses.id, courseId), eq(courses.teacherId, teacherId)));

  if (!course) return null;

  const courseLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(asc(lessons.order));

  return { course, lessons: courseLessons };
}
