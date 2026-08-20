import { z } from "zod";
import { COURSE_LEVELS } from "./types";

export const createCourseSchema = z.object({
  title: z.string().trim().min(3).max(120),
  specialty: z.string().trim().min(2).max(80),
  level: z.enum(COURSE_LEVELS),
  teachingLanguage: z.enum(["fr", "en"]),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
