import { z } from "zod";

export const teacherApplicationSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.email(),
  phone: z.string().trim().min(6).max(30),
  country: z.string().trim().min(2).max(60),
  field: z.enum(["musique", "son"]),
  teachingLanguages: z.array(z.enum(["fr", "en"])).min(1),
  motivation: z.string().trim().min(20).max(2000),
});

export type TeacherApplicationInput = z.infer<typeof teacherApplicationSchema>;
