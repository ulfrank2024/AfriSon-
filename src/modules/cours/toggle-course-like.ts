"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/client";
import { courseLikes, courses } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";

export type ToggleCourseLikeResult = { ok: true; liked: boolean } | { ok: false; error: string };

export async function toggleCourseLike(courseId: string): Promise<ToggleCourseLikeResult> {
  const appUser = await requireAppUser("eleve");
  if (!appUser) {
    return { ok: false, error: "unauthorized" };
  }
  if (typeof courseId !== "string" || !courseId) {
    return { ok: false, error: "invalid_input" };
  }

  const db = getDb();

  const [course] = await db
    .select({ id: courses.id })
    .from(courses)
    .where(and(eq(courses.id, courseId), eq(courses.status, "publie")));

  if (!course) {
    return { ok: false, error: "not_found" };
  }

  const [existing] = await db
    .select({ id: courseLikes.id })
    .from(courseLikes)
    .where(and(eq(courseLikes.courseId, courseId), eq(courseLikes.studentId, appUser.id)));

  if (existing) {
    await db.delete(courseLikes).where(eq(courseLikes.id, existing.id));
    revalidatePath(`/eleve/cours/${courseId}`);
    return { ok: true, liked: false };
  }

  await db.insert(courseLikes).values({ courseId, studentId: appUser.id });
  revalidatePath(`/eleve/cours/${courseId}`);
  return { ok: true, liked: true };
}
