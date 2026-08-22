import { getTranslations } from "next-intl/server";
import { ArrowLeft, CreditCard, Sparkles, Star, Crown, Radio, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getSubscriptionPlans } from "@/modules/abonnements/get-subscription-plans";
import { getStudentSubscription } from "@/modules/abonnements/get-student-subscription";
import { isFlutterwaveConfigured } from "@/modules/paiements/config";
import type { SubscriptionTier } from "@/modules/abonnements/types";

const TIER_ICONS: Record<SubscriptionTier, typeof Sparkles> = {
  decouverte: Sparkles,
  standard: Star,
  premium: Crown,
};

function formatXaf(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export default async function StudentSubscriptionPage() {
  const appUser = await requireAppUser("eleve");
  const t = await getTranslations("studentSubscription");

  const [plans, subscription] = await Promise.all([
    getSubscriptionPlans(),
    appUser ? getStudentSubscription(appUser.id) : Promise.resolve(null),
  ]);

  const activePlans = plans.filter((plan) => plan.isActive);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-10">
      <Link
        href="/eleve"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("back")}
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CreditCard className="size-5" strokeWidth={2.25} />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{t("description")}</p>
        </div>
      </div>

      {subscription && (
        <div className="mt-6 rounded-xl border border-border bg-card p-4">
          <p className="text-sm font-medium">
            {t("currentPlan", { tier: t(`tiers.${subscription.tier}`) })}
          </p>
          <Badge variant="secondary" className="mt-2">
            {t(`statuses.${subscription.status}`)}
          </Badge>
        </div>
      )}

      {activePlans.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="size-5" strokeWidth={2} />
          </span>
          <div>
            <p className="font-medium">{t("noPlans")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("noPlansHint")}</p>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {activePlans.map((plan) => {
            const Icon = TIER_ICONS[plan.tier];
            return (
              <div key={plan.tier} className="flex flex-col rounded-xl border border-border bg-card p-5">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" strokeWidth={2.25} />
                </span>
                <p className="mt-4 font-semibold">{t(`tiers.${plan.tier}`)}</p>
                <p className="mt-1 text-2xl font-bold tabular-nums">{formatXaf(plan.priceXaf)}</p>
                <p className="text-xs text-muted-foreground">{t("perMonth")}</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {t(`tierDescriptions.${plan.tier}`)}
                </p>
                {plan.liveIncluded && (
                  <span className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary">
                    <Radio className="size-3.5" />
                    {t("liveIncluded")}
                  </span>
                )}
                <div className="mt-4">
                  {isFlutterwaveConfigured ? (
                    <button
                      type="button"
                      className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                      {t("subscribe")}
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Lock className="size-3.5" />
                      {t("paymentComingSoon")}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
