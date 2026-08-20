import { eq, and, asc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { courses, lessons, users } from "@/db/schema";

/** Fetches a course for student viewing — only if it's published. */
export async function getPublishedCourse(courseId: string) {
  const db = getDb();

  const [course] = await db
    .select({
      id: courses.id,
      title: courses.title,
      specialty: courses.specialty,
      level: courses.level,
      teachingLanguage: courses.teachingLanguage,
      teacherName: users.fullName,
    })
    .from(courses)
    .innerJoin(users, eq(users.id, courses.teacherId))
    .where(and(eq(courses.id, courseId), eq(courses.status, "publie")));

  if (!course) return null;

  const courseLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, courseId))
    .orderBy(asc(lessons.order));

  return { course, lessons: courseLessons };
}
