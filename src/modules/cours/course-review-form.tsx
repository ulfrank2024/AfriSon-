"use client";

import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { reviewCourse } from "./review-course";

export function CourseReviewForm({ courseId }: { courseId: string }) {
  const t = useTranslations("adminCourses");

  return (
    <form action={reviewCourse} className="space-y-3 border-t border-border pt-4">
      <input type="hidden" name="courseId" value={courseId} />

      <div className="space-y-1.5">
        <Label htmlFor={`notes-${courseId}`}>{t("fields.notes")}</Label>
        <Textarea
          id={`notes-${courseId}`}
          name="adminNotes"
          placeholder={t("fields.notesPlaceholder")}
          rows={2}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="submit" name="decision" value="publie">
          {t("approve")}
        </Button>
        <Button type="submit" name="decision" value="rejete" variant="outline">
          {t("reject")}
        </Button>
      </div>
    </form>
  );
}
