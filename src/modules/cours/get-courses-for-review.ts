import { eq, desc, asc, inArray } from "drizzle-orm";
import { getDb } from "@/db/client";
import { courses, lessons, users } from "@/db/schema";
import type { CourseStatus } from "./types";

export async function getCoursesForReview(status?: CourseStatus) {
  const db = getDb();

  const courseRows = await db
    .select({
      id: courses.id,
      title: courses.title,
      specialty: courses.specialty,
      level: courses.level,
      teachingLanguage: courses.teachingLanguage,
      status: courses.status,
      adminNotes: courses.adminNotes,
      createdAt: courses.createdAt,
      teacherName: users.fullName,
      teacherEmail: users.email,
    })
    .from(courses)
    .innerJoin(users, eq(users.id, courses.teacherId))
    .where(status ? eq(courses.status, status) : undefined)
    .orderBy(desc(courses.createdAt));

  if (courseRows.length === 0) return [];

  const allLessons = await db
    .select()
    .from(lessons)
    .where(inArray(lessons.courseId, courseRows.map((c) => c.id)))
    .orderBy(asc(lessons.order));

  const lessonsByCourse = new Map<string, typeof allLessons>();
  for (const lesson of allLessons) {
    const list = lessonsByCourse.get(lesson.courseId) ?? [];
    list.push(lesson);
    lessonsByCourse.set(lesson.courseId, list);
  }

  return courseRows.map((course) => ({
    ...course,
    lessons: lessonsByCourse.get(course.id) ?? [],
  }));
}
