import { eq, desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { subscriptions } from "@/db/schema";

/** Most recent subscription for a student, if any. */
export async function getStudentSubscription(studentId: string) {
  const [row] = await getDb()
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.studentId, studentId))
    .orderBy(desc(subscriptions.createdAt))
    .limit(1);

  return row ?? null;
}
