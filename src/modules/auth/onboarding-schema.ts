import { z } from "zod";

export const onboardingSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  country: z.string().trim().min(2).max(60),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
