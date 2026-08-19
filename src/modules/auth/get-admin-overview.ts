import { eq, sql } from "drizzle-orm";
import { getDb } from "@/db/client";
import { users, teacherApplications } from "@/db/schema";

export async function getAdminOverview() {
  const db = getDb();

  const [[{ count: studentCount }], [{ count: teacherCount }], countries, [{ count: pendingApplications }]] =
    await Promise.all([
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(users)
        .where(eq(users.role, "eleve")),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(users)
        .where(eq(users.role, "enseignant")),
      db
        .select({ country: users.country, count: sql<number>`count(*)::int` })
        .from(users)
        .groupBy(users.country)
        .orderBy(sql`count(*) desc`),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(teacherApplications)
        .where(sql`${teacherApplications.status} not in ('valide', 'rejete')`),
    ]);

  return {
    studentCount,
    teacherCount,
    countryCount: countries.length,
    countries,
    pendingApplications,
  };
}
