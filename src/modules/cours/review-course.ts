"use server";

import { eq, and, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { courses, users } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { notifyCourseReviewDecision } from "@/modules/email/notify-course-review";

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

  const notes = typeof adminNotes === "string" && adminNotes.trim() ? adminNotes.trim() : null;
  const db = getDb();

  const [course] = await db
    .update(courses)
    .set({ status: decision, adminNotes: notes, updatedAt: new Date() })
    .where(and(eq(courses.id, courseId), inArray(courses.status, ["en_revue"])))
    .returning({ title: courses.title, teacherId: courses.teacherId });

  if (course) {
    const [teacher] = await db
      .select({ email: users.email, fullName: users.fullName, interfaceLanguage: users.interfaceLanguage })
      .from(users)
      .where(eq(users.id, course.teacherId));

    if (teacher?.email) {
      await notifyCourseReviewDecision({
        email: teacher.email,
        fullName: teacher.fullName,
        courseTitle: course.title,
        decision,
        adminNotes: notes,
        language: teacher.interfaceLanguage,
      });
    }
  }

  revalidatePath("/admin/cours");
  revalidatePath("/admin");
  redirect("/admin/cours");
}
