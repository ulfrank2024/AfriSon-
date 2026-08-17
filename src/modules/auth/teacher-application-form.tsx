"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  submitTeacherApplication,
  type SubmitTeacherApplicationResult,
} from "./submit-teacher-application";

const initialState: SubmitTeacherApplicationResult | null = null;

async function action(
  _prevState: SubmitTeacherApplicationResult | null,
  formData: FormData,
) {
  return submitTeacherApplication(formData);
}

export function TeacherApplicationForm() {
  const t = useTranslations("teacherApplication");
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mx-auto max-w-xl space-y-6 px-4 py-16">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("description")}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullName">{t("fields.fullName")}</Label>
        <Input id="fullName" name="fullName" required minLength={2} maxLength={120} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">{t("fields.email")}</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t("fields.phone")}</Label>
          <Input id="phone" name="phone" type="tel" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">{t("fields.country")}</Label>
        <Input id="country" name="country" required />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">{t("fields.field")}</legend>
        <RadioGroup name="field" defaultValue="musique" className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="musique" />
            {t("fields.fieldMusic")}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="son" />
            {t("fields.fieldSound")}
          </label>
        </RadioGroup>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">{t("fields.teachingLanguages")}</legend>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox name="teachingLanguages" value="fr" defaultChecked />
            Français
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox name="teachingLanguages" value="en" />
            English
          </label>
        </div>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="motivation">{t("fields.motivation")}</Label>
        <Textarea id="motivation" name="motivation" required minLength={20} rows={5} />
      </div>

      <Button type="submit" size="lg" disabled={isPending}>
        {t("submit")}
      </Button>

      {state?.ok === true && (
        <p className="text-sm font-medium text-green-600 dark:text-green-500">
          {t("success")}
        </p>
      )}
      {state?.ok === false && (
        <p className="text-sm font-medium text-destructive">{t("error")}</p>
      )}
    </form>
  );
}
