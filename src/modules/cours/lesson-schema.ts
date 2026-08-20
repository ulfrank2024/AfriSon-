import { z } from "zod";
import { LESSON_TYPES } from "./types";

export const createLessonSchema = z.object({
  courseId: z.uuid(),
  title: z.string().trim().min(3).max(120),
  type: z.enum(LESSON_TYPES),
  content: z.string().trim().min(3).max(4000),
});

export type CreateLessonInput = z.infer<typeof createLessonSchema>;
