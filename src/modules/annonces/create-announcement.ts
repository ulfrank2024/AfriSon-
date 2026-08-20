"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { announcements } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { createAnnouncementSchema } from "./announcement-schema";

export type CreateAnnouncementResult = { ok: true } | { ok: false; error: string };

export async function createAnnouncement(
  _prevState: CreateAnnouncementResult | null,
  formData: FormData,
): Promise<CreateAnnouncementResult> {
  const appUser = await requireAppUser("admin");
  if (!appUser) {
    return { ok: false, error: "unauthorized" };
  }

  const parsed = createAnnouncementSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    audience: formData.get("audience"),
  });

  if (!parsed.success) {
    return { ok: false, error: "invalid_input" };
  }

  await getDb()
    .insert(announcements)
    .values({ ...parsed.data, authorId: appUser.id });

  revalidatePath("/admin/annonces");
  redirect("/admin/annonces");
}
