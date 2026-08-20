import { eq, desc, count } from "drizzle-orm";
import { getDb } from "@/db/client";
import { courses, lessons } from "@/db/schema";

export async function getTeacherCourses(teacherId: string) {
  return getDb()
    .select({
      id: courses.id,
      title: courses.title,
      specialty: courses.specialty,
      level: courses.level,
      teachingLanguage: courses.teachingLanguage,
      status: courses.status,
      createdAt: courses.createdAt,
      lessonCount: count(lessons.id),
    })
    .from(courses)
    .leftJoin(lessons, eq(lessons.courseId, courses.id))
    .where(eq(courses.teacherId, teacherId))
    .groupBy(courses.id)
    .orderBy(desc(courses.createdAt));
}
