"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteLesson } from "./delete-lesson";

export function DeleteLessonForm({ lessonId, courseId }: { lessonId: string; courseId: string }) {
  return (
    <form action={deleteLesson}>
      <input type="hidden" name="lessonId" value={lessonId} />
      <input type="hidden" name="courseId" value={courseId} />
      <Button type="submit" variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-destructive">
        <Trash2 className="size-4" />
        <span className="sr-only">Supprimer</span>
      </Button>
    </form>
  );
}
