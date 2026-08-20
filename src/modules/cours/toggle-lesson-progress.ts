"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/client";
import { lessonProgress, lessons } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";

export type ToggleLessonProgressResult = { ok: true; completed: boolean } | { ok: false; error: string };

export async function toggleLessonProgress(
  lessonId: string,
  courseId: string,
): Promise<ToggleLessonProgressResult> {
  const appUser = await requireAppUser("eleve");
  if (!appUser) {
    return { ok: false, error: "unauthorized" };
  }
  if (typeof lessonId !== "string" || !lessonId) {
    return { ok: false, error: "invalid_input" };
  }

  const db = getDb();

  const [lesson] = await db.select({ id: lessons.id }).from(lessons).where(eq(lessons.id, lessonId));
  if (!lesson) {
    return { ok: false, error: "not_found" };
  }

  const [existing] = await db
    .select({ id: lessonProgress.id })
    .from(lessonProgress)
    .where(and(eq(lessonProgress.lessonId, lessonId), eq(lessonProgress.studentId, appUser.id)));

  if (existing) {
    await db.delete(lessonProgress).where(eq(lessonProgress.id, existing.id));
    revalidatePath(`/eleve/cours/${courseId}`);
    revalidatePath("/eleve");
    return { ok: true, completed: false };
  }

  await db.insert(lessonProgress).values({ lessonId, studentId: appUser.id });
  revalidatePath(`/eleve/cours/${courseId}`);
  revalidatePath("/eleve");
  return { ok: true, completed: true };
}
