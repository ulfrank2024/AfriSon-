"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { toggleCoursePublish } from "./toggle-course-publish";

export function PublishToggleForm({
  courseId,
  isPublished,
}: {
  courseId: string;
  isPublished: boolean;
}) {
  const t = useTranslations("teacherCourses");

  return (
    <form action={toggleCoursePublish}>
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="nextValue" value={(!isPublished).toString()} />
      <Button type="submit" variant={isPublished ? "outline" : "default"} size="sm">
        {isPublished ? t("unpublish") : t("publish")}
      </Button>
    </form>
  );
}
