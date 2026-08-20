"use server";

import { eq, and, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/client";
import { courses } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";

export async function submitCourseForReview(formData: FormData) {
  const appUser = await requireAppUser("enseignant");
  if (!appUser) return;

  const courseId = formData.get("courseId");
  if (typeof courseId !== "string") {
    throw new Error("invalid_input");
  }

  await getDb()
    .update(courses)
    .set({ status: "en_revue", adminNotes: null, updatedAt: new Date() })
    .where(
      and(
        eq(courses.id, courseId),
        eq(courses.teacherId, appUser.id),
        inArray(courses.status, ["brouillon", "rejete"]),
      ),
    );

  revalidatePath(`/enseignant/cours/${courseId}`);
  revalidatePath("/enseignant/cours");
}
