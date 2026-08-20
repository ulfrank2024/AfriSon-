import { and, eq, desc, or } from "drizzle-orm";
import { getDb } from "@/db/client";
import { announcements } from "@/db/schema";
import type { AnnouncementAudience } from "./types";

export async function getAnnouncementsForAudience(audience: Extract<AnnouncementAudience, "eleve" | "enseignant">) {
  return getDb()
    .select()
    .from(announcements)
    .where(
      and(
        eq(announcements.isPublished, true),
        or(eq(announcements.audience, "tous"), eq(announcements.audience, audience)),
      ),
    )
    .orderBy(desc(announcements.createdAt))
    .limit(5);
}
