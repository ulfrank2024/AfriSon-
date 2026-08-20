"use client";

import { useActionState, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createLesson, type CreateLessonResult } from "./create-lesson";
import { LESSON_TYPES, type LessonType } from "./types";

const initialState: CreateLessonResult | null = null;

export function LessonForm({ courseId }: { courseId: string }) {
  const t = useTranslations("teacherCourses");
  const [type, setType] = useState<LessonType>("video");
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(async (
    prevState: CreateLessonResult | null,
    formData: FormData,
  ) => {
    const result = await createLesson(prevState, formData);
    if (result.ok) {
      formRef.current?.reset();
      setType("video");
    }
    return result;
  }, initialState);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 rounded-xl border border-dashed border-border p-4"
    >
      <input type="hidden" name="courseId" value={courseId} />

      <div className="space-y-2">
        <Label htmlFor="lesson-title">{t("fields.lessonTitle")}</Label>
        <Input id="lesson-title" name="title" required minLength={3} maxLength={120} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="lesson-type">{t("fields.lessonType")}</Label>
        <Select name="type" defaultValue="video" onValueChange={(v) => setType(v as LessonType)}>
          <SelectTrigger id="lesson-type" className="w-full sm:w-56">
            <SelectValue>
              {(value: LessonType | null) => (value ? t(`lessonTypes.${value}`) : "")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {LESSON_TYPES.map((lessonType) => (
              <SelectItem key={lessonType} value={lessonType}>
                {t(`lessonTypes.${lessonType}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lesson-content">
          {type === "video" ? t("fields.lessonContentVideo") : t("fields.lessonContent")}
        </Label>
        <Textarea
          id="lesson-content"
          name="content"
          required
          minLength={3}
          maxLength={4000}
          rows={3}
          placeholder={type === "video" ? t("fields.lessonContentVideoPlaceholder") : undefined}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {t("addLesson")}
      </Button>

      {state?.ok === false && (
        <p className="text-sm font-medium text-destructive">{t("create.error")}</p>
      )}
    </form>
  );
}
