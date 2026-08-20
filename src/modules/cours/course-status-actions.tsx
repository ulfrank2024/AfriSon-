"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { submitCourseForReview } from "./submit-course-for-review";
import { unpublishCourse } from "./unpublish-course";
import type { CourseStatus } from "./types";

const STATUS_VARIANT: Record<CourseStatus, "outline" | "secondary" | "default"> = {
  brouillon: "outline",
  en_revue: "secondary",
  publie: "default",
  rejete: "outline",
};

export function CourseStatusActions({
  courseId,
  status,
  adminNotes,
}: {
  courseId: string;
  status: CourseStatus;
  adminNotes: string | null;
}) {
  const t = useTranslations("teacherCourses");

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <Badge variant={STATUS_VARIANT[status]}>{t(`statuses.${status}`)}</Badge>

        {status === "brouillon" && (
          <form action={submitCourseForReview}>
            <input type="hidden" name="courseId" value={courseId} />
            <Button type="submit" size="sm">
              {t("submitForReview")}
            </Button>
          </form>
        )}

        {status === "rejete" && (
          <form action={submitCourseForReview}>
            <input type="hidden" name="courseId" value={courseId} />
            <Button type="submit" size="sm">
              {t("resubmit")}
            </Button>
          </form>
        )}

        {status === "publie" && (
          <form action={unpublishCourse}>
            <input type="hidden" name="courseId" value={courseId} />
            <Button type="submit" variant="outline" size="sm">
              {t("unpublish")}
            </Button>
          </form>
        )}
      </div>

      {status === "en_revue" && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {t("underReviewNote")}
        </p>
      )}

      {status === "rejete" && adminNotes && (
        <p className="flex max-w-xs items-start gap-1.5 text-right text-xs text-destructive">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
          {adminNotes}
        </p>
      )}
    </div>
  );
}
