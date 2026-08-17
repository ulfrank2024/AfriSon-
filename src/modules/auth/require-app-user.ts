import { redirect } from "next/navigation";
import { requireUser } from "./require-user";
import { getAppUserByClerkId } from "./get-app-user";
import { isClerkConfigured } from "./config";
import { dashboardPathForRole, type UserRole } from "./types";

/**
 * Call at the top of a role-specific dashboard page. Ensures the
 * visitor is signed in, has finished onboarding (a `users` row exists
 * for their Clerk account), and holds the expected role — redirecting
 * to the right place at each step. No-op until Clerk is configured.
 */
export async function requireAppUser(expectedRole?: UserRole) {
  const clerkId = await requireUser();
  if (!isClerkConfigured || !clerkId) {
    return null;
  }

  const appUser = await getAppUserByClerkId(clerkId);
  if (!appUser) {
    redirect("/onboarding");
  }

  if (expectedRole && appUser.role !== expectedRole) {
    redirect(dashboardPathForRole(appUser.role));
  }

  return appUser;
}
