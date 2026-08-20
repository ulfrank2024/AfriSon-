"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/client";
import { courseRatings, courses } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { rateCourseSchema } from "./rating-schema";

export type RateCourseResult = { ok: true } | { ok: false; error: string };

export async function rateCourse(courseId: string, rating: number): Promise<RateCourseResult> {
  const appUser = await requireAppUser("eleve");
  if (!appUser) {
    return { ok: false, error: "unauthorized" };
  }

  const parsed = rateCourseSchema.safeParse({ courseId, rating });
  if (!parsed.success) {
    return { ok: false, error: "invalid_input" };
  }

  const db = getDb();

  const [course] = await db
    .select({ id: courses.id })
    .from(courses)
    .where(and(eq(courses.id, parsed.data.courseId), eq(courses.status, "publie")));

  if (!course) {
    return { ok: false, error: "not_found" };
  }

  await db
    .insert(courseRatings)
    .values({
      courseId: parsed.data.courseId,
      studentId: appUser.id,
      rating: parsed.data.rating,
    })
    .onConflictDoUpdate({
      target: [courseRatings.courseId, courseRatings.studentId],
      set: { rating: parsed.data.rating, updatedAt: new Date() },
    });

  revalidatePath(`/eleve/cours/${parsed.data.courseId}`);
  return { ok: true };
}
