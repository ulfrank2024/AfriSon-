"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/client";
import { announcements } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";

export async function toggleAnnouncementPublished(formData: FormData) {
  await requireAppUser("admin");

  const id = formData.get("id");
  const nextValue = formData.get("nextValue");
  if (typeof id !== "string" || typeof nextValue !== "string") {
    throw new Error("invalid_input");
  }

  await getDb()
    .update(announcements)
    .set({ isPublished: nextValue === "true", updatedAt: new Date() })
    .where(eq(announcements.id, id));

  revalidatePath("/admin/annonces");
}
