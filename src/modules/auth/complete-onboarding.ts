"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { users } from "@/db/schema";
import { onboardingSchema } from "./onboarding-schema";

export type CompleteOnboardingResult = { ok: false; error: string };

/**
 * Every new account starts as "eleve" (student). Becoming an
 * "enseignant" happens only once an admin validates a teacher
 * application (see modules/auth/teacher-application-schema.ts), never
 * through self-service role selection.
 */
export async function completeOnboarding(
  _prevState: CompleteOnboardingResult | null,
  formData: FormData,
): Promise<CompleteOnboardingResult | null> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const parsed = onboardingSchema.safeParse({
    fullName: formData.get("fullName"),
    country: formData.get("country"),
  });

  if (!parsed.success) {
    return { ok: false, error: "invalid_input" };
  }

  const clerkUser = await currentUser();

  await getDb()
    .insert(users)
    .values({
      clerkId: userId,
      role: "eleve",
      fullName: parsed.data.fullName,
      country: parsed.data.country,
      email: clerkUser?.primaryEmailAddress?.emailAddress ?? null,
      phone: clerkUser?.primaryPhoneNumber?.phoneNumber ?? null,
    });

  redirect("/eleve");
}
