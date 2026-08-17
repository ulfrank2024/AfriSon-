import { clerkMiddleware } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { isClerkConfigured } from "./modules/auth/config";

const intlMiddleware = createIntlMiddleware(routing);

/**
 * Only wires Clerk when it's actually configured, so the app keeps
 * working before Neon/Clerk credentials are provisioned. Auth checks
 * for protected routes live per-page (see modules/auth/require-user.ts)
 * rather than here, per Clerk's current guidance — path-based
 * middleware matching can diverge from how Next.js resolves routes.
 */
export default isClerkConfigured
  ? clerkMiddleware((_auth, req) => intlMiddleware(req))
  : intlMiddleware;

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
