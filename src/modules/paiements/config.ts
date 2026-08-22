/** Flutterwave isn't provisioned yet. Payment-triggering UI checks this
 * flag first so pricing/plan pages stay fully informational (and never
 * offer a checkout button that can't actually charge anyone) until real
 * keys are added to .env. */
export const isFlutterwaveConfigured = Boolean(process.env.FLUTTERWAVE_SECRET_KEY);
