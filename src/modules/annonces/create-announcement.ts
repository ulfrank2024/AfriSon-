"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { announcements } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";
import {
  createAnnouncementSchema,
  MAX_ANNOUNCEMENT_IMAGE_BYTES,
  ALLOWED_ANNOUNCEMENT_IMAGE_TYPES,
} from "./announcement-schema";

export type CreateAnnouncementResult = { ok: true } | { ok: false; error: string };

export async function createAnnouncement(
  _prevState: CreateAnnouncementResult | null,
  formData: FormData,
): Promise<CreateAnnouncementResult> {
  const appUser = await requireAppUser("admin");
  if (!appUser) {
    return { ok: false, error: "unauthorized" };
  }

  const imageFile = formData.get("imageFile");
  const imageUrlInput = formData.get("imageUrl");

  let imageUrl: string | undefined;

  if (imageFile instanceof File && imageFile.size > 0) {
    if (imageFile.size > MAX_ANNOUNCEMENT_IMAGE_BYTES) {
      return { ok: false, error: "image_too_large" };
    }
    if (!ALLOWED_ANNOUNCEMENT_IMAGE_TYPES.includes(imageFile.type)) {
      return { ok: false, error: "image_invalid_type" };
    }
    const blob = await put(`announcements/${crypto.randomUUID()}-${imageFile.name}`, imageFile, {
      access: "public",
    });
    imageUrl = blob.url;
  } else if (typeof imageUrlInput === "string" && imageUrlInput.trim()) {
    imageUrl = imageUrlInput.trim();
  }

  const parsed = createAnnouncementSchema.safeParse({
    title: formData.get("title"),
    body: formData.get("body"),
    audience: formData.get("audience"),
    imageUrl,
  });

  if (!parsed.success) {
    return { ok: false, error: "invalid_input" };
  }

  await getDb()
    .insert(announcements)
    .values({
      title: parsed.data.title,
      body: parsed.data.body,
      audience: parsed.data.audience,
      imageUrl: parsed.data.imageUrl || null,
      authorId: appUser.id,
    });

  revalidatePath("/admin/annonces");
  redirect("/admin/annonces");
}
