import { eq, count, countDistinct } from "drizzle-orm";
import { getDb } from "@/db/client";
import { courses, lessons } from "@/db/schema";

export async function getCourseCatalogueStats() {
  const db = getDb();

  const [courseRow] = await db
    .select({
      totalCourses: count(courses.id),
      totalTeachers: countDistinct(courses.teacherId),
    })
    .from(courses)
    .where(eq(courses.status, "publie"));

  const [lessonRow] = await db
    .select({ totalLessons: count(lessons.id) })
    .from(lessons)
    .innerJoin(courses, eq(courses.id, lessons.courseId))
    .where(eq(courses.status, "publie"));

  return {
    totalCourses: courseRow.totalCourses,
    totalTeachers: courseRow.totalTeachers,
    totalLessons: lessonRow.totalLessons,
  };
}
