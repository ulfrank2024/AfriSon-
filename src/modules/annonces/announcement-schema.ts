import { z } from "zod";
import { ANNOUNCEMENT_AUDIENCES } from "./types";

export const createAnnouncementSchema = z.object({
  title: z.string().trim().min(3).max(120),
  body: z.string().trim().min(3).max(2000),
  audience: z.enum(ANNOUNCEMENT_AUDIENCES),
});
