"use client";

import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { saveSubscriptionPlan } from "./save-subscription-plan";
import type { SubscriptionPlan } from "./get-subscription-plans";

export function SubscriptionPlanForm({ plan }: { plan: SubscriptionPlan }) {
  const t = useTranslations("adminSubscriptions");

  return (
    <form
      action={saveSubscriptionPlan}
      className="space-y-4 rounded-xl border border-border bg-card p-5"
    >
      <input type="hidden" name="tier" value={plan.tier} />

      <div>
        <h3 className="font-semibold">{t(`tiers.${plan.tier}`)}</h3>
        <p className="text-sm text-muted-foreground">{t(`tierDescriptions.${plan.tier}`)}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`price-${plan.tier}`}>{t("fields.price")}</Label>
        <div className="flex items-center gap-2">
          <Input
            id={`price-${plan.tier}`}
            name="priceXaf"
            type="number"
            min={0}
            step={100}
            defaultValue={plan.priceXaf}
            className="w-40"
          />
          <span className="text-sm text-muted-foreground">{t("fields.perMonth")}</span>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <Checkbox name="liveIncluded" defaultChecked={plan.liveIncluded} />
        {t("fields.liveIncluded")}
      </label>

      <label className="flex items-center gap-2 text-sm">
        <Checkbox name="isActive" defaultChecked={plan.isActive} />
        {t("fields.isActive")}
      </label>

      <Button type="submit" size="sm">
        {t("save")}
      </Button>
    </form>
  );
}
