/**
 * Clerk credentials aren't provisioned yet (pending Neon/Clerk setup).
 * Every Clerk touchpoint in the app checks this flag first so the rest
 * of the product keeps working until real keys are added to .env.
 */
export const isClerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
);
