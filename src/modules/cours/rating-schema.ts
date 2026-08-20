import { z } from "zod";

export const rateCourseSchema = z.object({
  courseId: z.uuid(),
  rating: z.coerce.number().int().min(1).max(5),
});
