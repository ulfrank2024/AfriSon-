/** Aligns Clerk's default (blue) theme with the AfriSon brand palette.
 * Uses hex approximations of the oklch tokens in globals.css since
 * Clerk's theming variables don't accept oklch(). */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#e2600f",
    colorTextOnPrimaryBackground: "#ffffff",
    borderRadius: "0.625rem",
    fontFamily: "var(--font-sans)",
  },
  elements: {
    card: "shadow-none border border-border",
    formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
    footerActionLink: "text-primary hover:text-primary/80",
  },
};
