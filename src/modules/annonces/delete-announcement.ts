"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/client";
import { announcements } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";

export async function deleteAnnouncement(formData: FormData) {
  await requireAppUser("admin");

  const id = formData.get("id");
  if (typeof id !== "string") {
    throw new Error("invalid_input");
  }

  await getDb().delete(announcements).where(eq(announcements.id, id));

  revalidatePath("/admin/annonces");
}
