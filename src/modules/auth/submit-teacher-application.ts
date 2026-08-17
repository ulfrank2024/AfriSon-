"use server";

import { getDb } from "@/db/client";
import { teacherApplications } from "@/db/schema";
import { teacherApplicationSchema } from "./teacher-application-schema";

export type SubmitTeacherApplicationResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitTeacherApplication(
  formData: FormData,
): Promise<SubmitTeacherApplicationResult> {
  const parsed = teacherApplicationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    field: formData.get("field"),
    teachingLanguages: formData.getAll("teachingLanguages"),
    motivation: formData.get("motivation"),
  });

  if (!parsed.success) {
    return { ok: false, error: "invalid_input" };
  }

  try {
    await getDb().insert(teacherApplications).values(parsed.data);
    return { ok: true };
  } catch {
    return { ok: false, error: "server_error" };
  }
}
