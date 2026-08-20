"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleCourseLike } from "./toggle-course-like";

export function CourseLikeButton({
  courseId,
  likeCount,
  isLiked,
}: {
  courseId: string;
  likeCount: number;
  isLiked: boolean;
}) {
  const t = useTranslations("studentCourses");
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likeCount);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));
    startTransition(async () => {
      const result = await toggleCourseLike(courseId);
      if (!result.ok || result.liked !== nextLiked) {
        setLiked(isLiked);
        setCount(likeCount);
      }
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-60",
        liked
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary",
      )}
    >
      <Heart className={cn("size-4", liked && "fill-primary")} />
      {count > 0 ? count : t("like")}
    </button>
  );
}
