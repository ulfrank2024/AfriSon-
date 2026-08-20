"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { UserRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  completeOnboarding,
  type CompleteOnboardingResult,
} from "./complete-onboarding";

export function OnboardingForm() {
  const t = useTranslations("onboarding");
  const [state, formAction, isPending] = useActionState<
    CompleteOnboardingResult | null,
    FormData
  >(completeOnboarding, null);

  return (
    <div>
      <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <UserRound className="size-5" strokeWidth={2.25} />
      </span>

      <h1 className="mt-4 text-xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("description")}</p>

      <form action={formAction} className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t("fields.fullName")}</Label>
          <Input id="fullName" name="fullName" required minLength={2} maxLength={120} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">{t("fields.country")}</Label>
          <Input id="country" name="country" required placeholder={t("fields.countryPlaceholder")} />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isPending}>
          {t("submit")}
        </Button>

        {state?.ok === false && (
          <p className="text-sm font-medium text-destructive">{t("error")}</p>
        )}
      </form>
    </div>
  );
}
