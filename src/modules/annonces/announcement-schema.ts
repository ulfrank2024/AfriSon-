import { z } from "zod";
import { ANNOUNCEMENT_AUDIENCES } from "./types";

export const createAnnouncementSchema = z.object({
  title: z.string().trim().min(3).max(120),
  body: z.string().trim().min(3).max(2000),
  audience: z.enum(ANNOUNCEMENT_AUDIENCES),
  imageUrl: z.url().optional().or(z.literal("")),
});

export const MAX_ANNOUNCEMENT_IMAGE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_ANNOUNCEMENT_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
