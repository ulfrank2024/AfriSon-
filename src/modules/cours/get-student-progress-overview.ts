import { eq, desc, count, inArray } from "drizzle-orm";
import { getDb } from "@/db/client";
import { lessonProgress, lessons, courses } from "@/db/schema";

export async function getStudentProgressOverview(studentId: string) {
  const db = getDb();

  const progressRows = await db
    .select({
      courseId: lessons.courseId,
      lessonId: lessonProgress.lessonId,
      completedAt: lessonProgress.completedAt,
    })
    .from(lessonProgress)
    .innerJoin(lessons, eq(lessons.id, lessonProgress.lessonId))
    .where(eq(lessonProgress.studentId, studentId))
    .orderBy(desc(lessonProgress.completedAt));

  const totalLessonsCompleted = progressRows.length;

  const completedByCourseCount = new Map<string, number>();
  const orderedCourseIds: string[] = [];
  for (const row of progressRows) {
    completedByCourseCount.set(row.courseId, (completedByCourseCount.get(row.courseId) ?? 0) + 1);
    if (!orderedCourseIds.includes(row.courseId)) orderedCourseIds.push(row.courseId);
  }

  const coursesStartedCount = orderedCourseIds.length;
  const recentCourseIds = orderedCourseIds.slice(0, 3);

  if (recentCourseIds.length === 0) {
    return { totalLessonsCompleted, coursesStartedCount, recentCourses: [] };
  }

  const courseRows = await db
    .select({ id: courses.id, title: courses.title, totalLessons: count(lessons.id) })
    .from(courses)
    .leftJoin(lessons, eq(lessons.courseId, courses.id))
    .where(inArray(courses.id, recentCourseIds))
    .groupBy(courses.id);

  const courseById = new Map(courseRows.map((c) => [c.id, c]));

  const recentCourses = recentCourseIds
    .map((id) => courseById.get(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({
      id: c.id,
      title: c.title,
      completedCount: completedByCourseCount.get(c.id) ?? 0,
      totalLessons: c.totalLessons,
    }));

  return { totalLessonsCompleted, coursesStartedCount, recentCourses };
}
