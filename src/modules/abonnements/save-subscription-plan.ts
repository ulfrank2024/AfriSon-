"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db/client";
import { subscriptionPlans } from "@/db/schema";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { savePlanSchema } from "./plan-schema";

export async function saveSubscriptionPlan(formData: FormData) {
  await requireAppUser("admin");

  const parsed = savePlanSchema.safeParse({
    tier: formData.get("tier"),
    priceXaf: formData.get("priceXaf"),
    liveIncluded: formData.get("liveIncluded") === "on",
    isActive: formData.get("isActive") === "on",
  });

  if (!parsed.success) {
    throw new Error("invalid_input");
  }

  const db = getDb();
  const { tier, ...rest } = parsed.data;

  const [existing] = await db
    .select({ id: subscriptionPlans.id })
    .from(subscriptionPlans)
    .where(eq(subscriptionPlans.tier, tier));

  if (existing) {
    await db
      .update(subscriptionPlans)
      .set({ ...rest, updatedAt: new Date() })
      .where(eq(subscriptionPlans.tier, tier));
  } else {
    await db.insert(subscriptionPlans).values({ tier, ...rest });
  }

  revalidatePath("/admin/abonnements");
  revalidatePath("/eleve/abonnement");
}
