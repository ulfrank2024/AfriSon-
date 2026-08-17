import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

let cachedDb: ReturnType<typeof drizzle<typeof schema>> | undefined;

/**
 * Lazily creates the Drizzle client on first use so that importing this
 * module never fails at build time when DATABASE_URL isn't set yet
 * (e.g. before Neon is provisioned).
 */
export function getDb() {
  if (!cachedDb) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not set");
    }
    cachedDb = drizzle(neon(process.env.DATABASE_URL), { schema });
  }
  return cachedDb;
}
