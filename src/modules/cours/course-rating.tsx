"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { rateCourse } from "./rate-course";

export function CourseRating({
  courseId,
  averageRating,
  ratingCount,
  myRating,
}: {
  courseId: string;
  averageRating: number | null;
  ratingCount: number;
  myRating: number | null;
}) {
  const t = useTranslations("studentCourses");
  const [rating, setRating] = useState(myRating);
  const [hovered, setHovered] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleClick(value: number) {
    setRating(value);
    startTransition(async () => {
      const result = await rateCourse(courseId, value);
      if (!result.ok) {
        setRating(myRating);
      }
    });
  }

  const displayValue = hovered ?? rating ?? 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-0.5" onMouseLeave={() => setHovered(null)}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            disabled={isPending}
            onMouseEnter={() => setHovered(value)}
            onClick={() => handleClick(value)}
            className="p-0.5 disabled:opacity-60"
          >
            <Star
              className={cn(
                "size-5 transition-colors",
                value <= displayValue ? "fill-primary text-primary" : "fill-none text-muted-foreground",
              )}
            />
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {rating
          ? t("yourRating", { rating })
          : averageRating
            ? t("averageRating", { average: averageRating.toFixed(1), count: ratingCount })
            : t("noRatingsYet")}
      </p>
    </div>
  );
}
