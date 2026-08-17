import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isClerkConfigured } from "./config";

/** Call at the top of a protected page/layout. No-op until Clerk is
 * configured, so dashboards stay reachable while auth is set up. */
export async function requireUser() {
  if (!isClerkConfigured) {
    return null;
  }

  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return userId;
}
