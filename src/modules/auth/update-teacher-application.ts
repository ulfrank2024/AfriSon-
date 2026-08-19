"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { teacherApplications, users } from "@/db/schema";
import { requireAppUser } from "./require-app-user";
import { APPLICATION_STATUSES, type ApplicationStatus } from "./types";

function isApplicationStatus(value: FormDataEntryValue | null): value is ApplicationStatus {
  return typeof value === "string" && (APPLICATION_STATUSES as readonly string[]).includes(value);
}

/**
 * Admin-only: updates an application's status and internal notes. When
 * the status is set to "valide", promotes any existing student account
 * matching the applicant's email to "enseignant" — never creates an
 * account, and never overwrites an admin/partenaire role.
 */
export async function updateTeacherApplication(formData: FormData) {
  await requireAppUser("admin");

  const id = formData.get("id");
  const status = formData.get("status");
  const internalNotes = formData.get("internalNotes");

  if (typeof id !== "string" || !isApplicationStatus(status)) {
    throw new Error("invalid_input");
  }

  const db = getDb();

  const [application] = await db
    .update(teacherApplications)
    .set({
      status,
      internalNotes: typeof internalNotes === "string" ? internalNotes : null,
      updatedAt: new Date(),
    })
    .where(eq(teacherApplications.id, id))
    .returning();

  if (application && status === "valide") {
    await db
      .update(users)
      .set({ role: "enseignant" })
      .where(and(eq(users.email, application.email), eq(users.role, "eleve")));
  }

  revalidatePath("/admin/candidatures");
  redirect("/admin/candidatures");
}
