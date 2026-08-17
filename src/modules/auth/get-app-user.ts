import { eq } from "drizzle-orm";
import { getDb } from "@/db/client";
import { users } from "@/db/schema";

export async function getAppUserByClerkId(clerkId: string) {
  const [row] = await getDb()
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  return row ?? null;
}
