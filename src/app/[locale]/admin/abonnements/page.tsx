import { getTranslations } from "next-intl/server";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getSubscriptionPlans } from "@/modules/abonnements/get-subscription-plans";
import { SubscriptionPlanForm } from "@/modules/abonnements/subscription-plan-form";

export default async function AdminSubscriptionsPage() {
  await requireAppUser("admin");
  const t = await getTranslations("adminSubscriptions");
  const plans = await getSubscriptionPlans();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("description")}</p>

      <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
        {t("paymentNotice")}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => (
          <SubscriptionPlanForm key={plan.tier} plan={plan} />
        ))}
      </div>
    </div>
  );
}
