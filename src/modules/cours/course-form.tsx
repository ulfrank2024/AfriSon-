"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createCourse, type CreateCourseResult } from "./create-course";
import { COURSE_LEVELS, type CourseLevel } from "./types";

const initialState: CreateCourseResult | null = null;

export function CourseForm() {
  const t = useTranslations("teacherCourses");
  const [state, formAction, isPending] = useActionState(createCourse, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">{t("fields.title")}</Label>
        <Input id="title" name="title" required minLength={3} maxLength={120} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialty">{t("fields.specialty")}</Label>
        <Input
          id="specialty"
          name="specialty"
          required
          minLength={2}
          maxLength={80}
          placeholder={t("fields.specialtyPlaceholder")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="level">{t("fields.level")}</Label>
          <Select name="level" defaultValue="debutant">
            <SelectTrigger id="level" className="w-full">
              <SelectValue>
                {(value: CourseLevel | null) => (value ? t(`levels.${value}`) : "")}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {COURSE_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {t(`levels.${level}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="teachingLanguage">{t("fields.teachingLanguage")}</Label>
          <Select name="teachingLanguage" defaultValue="fr">
            <SelectTrigger id="teachingLanguage" className="w-full">
              <SelectValue>
                {(value: "fr" | "en" | null) =>
                  value ? t(`teachingLanguages.${value}`) : ""
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">{t("teachingLanguages.fr")}</SelectItem>
              <SelectItem value="en">{t("teachingLanguages.en")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={isPending}>
        {t("create.submit")}
      </Button>

      {state?.ok === false && (
        <p className="text-sm font-medium text-destructive">{t("create.error")}</p>
      )}
    </form>
  );
}
