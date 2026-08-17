import { redirect } from "next/navigation";
import { requireUser } from "@/modules/auth/require-user";
import { getAppUserByClerkId } from "@/modules/auth/get-app-user";
import { dashboardPathForRole } from "@/modules/auth/types";
import { OnboardingForm } from "@/modules/auth/onboarding-form";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const clerkId = await requireUser();
  if (!clerkId) {
    redirect("/login");
  }

  const appUser = await getAppUserByClerkId(clerkId);
  if (appUser) {
    redirect(dashboardPathForRole(appUser.role));
  }

  return <OnboardingForm />;
}
