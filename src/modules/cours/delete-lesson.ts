"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/client";
import { courses, lessons } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";

export async function deleteLesson(formData: FormData) {
  const appUser = await requireAppUser("enseignant");
  if (!appUser) return;

  const lessonId = formData.get("lessonId");
  const courseId = formData.get("courseId");
  if (typeof lessonId !== "string" || typeof courseId !== "string") {
    throw new Error("invalid_input");
  }

  const db = getDb();

  const [course] = await db
    .select({ id: courses.id, status: courses.status })
    .from(courses)
    .where(and(eq(courses.id, courseId), eq(courses.teacherId, appUser.id)));

  if (!course || course.status === "en_revue") return;

  await db.delete(lessons).where(and(eq(lessons.id, lessonId), eq(lessons.courseId, courseId)));

  revalidatePath(`/enseignant/cours/${courseId}`);
}
