import { eq, and, asc, avg, count, inArray } from "drizzle-orm";
import { getDb } from "@/db/client";
import { courses, lessons, users, courseRatings, courseLikes, lessonProgress } from "@/db/schema";

/** Fetches a course for student viewing — only if it's published. When
 * studentId is provided, also resolves that student's own rating/like/
 * lesson-progress state so the UI can pre-fill the widgets. */
export async function getPublishedCourse(courseId: string, studentId?: string) {
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

  const [courseLessons, [ratingAgg], [likeAgg], [myRating], [myLike]] = await Promise.all([
    db.select().from(lessons).where(eq(lessons.courseId, courseId)).orderBy(asc(lessons.order)),
    db
      .select({ average: avg(courseRatings.rating), count: count(courseRatings.id) })
      .from(courseRatings)
      .where(eq(courseRatings.courseId, courseId)),
    db.select({ count: count(courseLikes.id) }).from(courseLikes).where(eq(courseLikes.courseId, courseId)),
    studentId
      ? db
          .select({ rating: courseRatings.rating })
          .from(courseRatings)
          .where(and(eq(courseRatings.courseId, courseId), eq(courseRatings.studentId, studentId)))
      : Promise.resolve([]),
    studentId
      ? db
          .select({ id: courseLikes.id })
          .from(courseLikes)
          .where(and(eq(courseLikes.courseId, courseId), eq(courseLikes.studentId, studentId)))
      : Promise.resolve([]),
  ]);

  const completedLessonIds =
    studentId && courseLessons.length > 0
      ? new Set(
          (
            await db
              .select({ lessonId: lessonProgress.lessonId })
              .from(lessonProgress)
              .where(
                and(
                  eq(lessonProgress.studentId, studentId),
                  inArray(
                    lessonProgress.lessonId,
                    courseLessons.map((l) => l.id),
                  ),
                ),
              )
          ).map((r) => r.lessonId),
        )
      : new Set<string>();

  return {
    course,
    lessons: courseLessons.map((lesson) => ({
      ...lesson,
      completed: completedLessonIds.has(lesson.id),
    })),
    completedCount: completedLessonIds.size,
    averageRating: ratingAgg.average ? Number(ratingAgg.average) : null,
    ratingCount: ratingAgg.count,
    likeCount: likeAgg.count,
    myRating: myRating?.rating ?? null,
    isLiked: Boolean(myLike),
  };
}
