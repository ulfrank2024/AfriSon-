"use server";

import { eq, and, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/client";
import { courses, lessons } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { createLessonSchema } from "./lesson-schema";

export type CreateLessonResult = { ok: true } | { ok: false; error: string };

export async function createLesson(
  _prevState: CreateLessonResult | null,
  formData: FormData,
): Promise<CreateLessonResult> {
  const appUser = await requireAppUser("enseignant");
  if (!appUser) {
    return { ok: false, error: "unauthorized" };
  }

  const parsed = createLessonSchema.safeParse({
    courseId: formData.get("courseId"),
    title: formData.get("title"),
    type: formData.get("type"),
    content: formData.get("content"),
  });

  if (!parsed.success) {
    return { ok: false, error: "invalid_input" };
  }

  const db = getDb();

  const [course] = await db
    .select({ id: courses.id })
    .from(courses)
    .where(and(eq(courses.id, parsed.data.courseId), eq(courses.teacherId, appUser.id)));

  if (!course) {
    return { ok: false, error: "not_found" };
  }

  const [{ value: lessonCount }] = await db
    .select({ value: count() })
    .from(lessons)
    .where(eq(lessons.courseId, parsed.data.courseId));

  await db.insert(lessons).values({ ...parsed.data, order: lessonCount });

  revalidatePath(`/enseignant/cours/${parsed.data.courseId}`);
  return { ok: true };
}
