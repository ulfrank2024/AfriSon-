"use server";

import { eq, and, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { courses } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";

function isReviewDecision(value: FormDataEntryValue | null): value is "publie" | "rejete" {
  return value === "publie" || value === "rejete";
}

export async function reviewCourse(formData: FormData) {
  await requireAppUser("admin");

  const courseId = formData.get("courseId");
  const decision = formData.get("decision");
  const adminNotes = formData.get("adminNotes");

  if (typeof courseId !== "string" || !isReviewDecision(decision)) {
    throw new Error("invalid_input");
  }

  const db = getDb();

  await db
    .update(courses)
    .set({
      status: decision,
      adminNotes: typeof adminNotes === "string" && adminNotes.trim() ? adminNotes.trim() : null,
      updatedAt: new Date(),
    })
    .where(and(eq(courses.id, courseId), inArray(courses.status, ["en_revue"])));

  revalidatePath("/admin/cours");
  revalidatePath("/admin");
  redirect("/admin/cours");
}
