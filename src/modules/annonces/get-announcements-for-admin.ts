import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { announcements } from "@/db/schema";

export async function getAnnouncementsForAdmin() {
  return getDb().select().from(announcements).orderBy(desc(announcements.createdAt));
}
