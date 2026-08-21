/**
 * Brevo (email) isn't provisioned yet. Every notification call checks
 * this flag first so the rest of the product keeps working — and admin
 * actions never fail — until a real API key is added to .env.
 */
export const isBrevoConfigured = Boolean(process.env.BREVO_API_KEY);
