"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleLessonProgress } from "./toggle-lesson-progress";

export function LessonProgressCheckbox({
  lessonId,
  courseId,
  completed,
}: {
  lessonId: string;
  courseId: string;
  completed: boolean;
}) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const next = !isCompleted;
    setIsCompleted(next);
    startTransition(async () => {
      const result = await toggleLessonProgress(lessonId, courseId);
      if (!result.ok || result.completed !== next) {
        setIsCompleted(completed);
      }
    });
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleClick}
      aria-pressed={isCompleted}
      className={cn(
        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors disabled:opacity-60",
        isCompleted
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-transparent hover:border-primary/50",
      )}
    >
      <Check className="size-3" strokeWidth={3} />
    </button>
  );
}
