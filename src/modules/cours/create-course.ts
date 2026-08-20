"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { courses } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { createCourseSchema } from "./course-schema";

export type CreateCourseResult = { ok: true } | { ok: false; error: string };

export async function createCourse(
  _prevState: CreateCourseResult | null,
  formData: FormData,
): Promise<CreateCourseResult> {
  const appUser = await requireAppUser("enseignant");
  if (!appUser) {
    return { ok: false, error: "unauthorized" };
  }

  const parsed = createCourseSchema.safeParse({
    title: formData.get("title"),
    specialty: formData.get("specialty"),
    level: formData.get("level"),
    teachingLanguage: formData.get("teachingLanguage"),
  });

  if (!parsed.success) {
    return { ok: false, error: "invalid_input" };
  }

  const [course] = await getDb()
    .insert(courses)
    .values({ ...parsed.data, teacherId: appUser.id })
    .returning({ id: courses.id });

  redirect(`/enseignant/cours/${course.id}`);
}
