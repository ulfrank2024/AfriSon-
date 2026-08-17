export const COURSE_LEVELS = ["debutant", "intermediaire", "avance"] as const;
export type CourseLevel = (typeof COURSE_LEVELS)[number];

export const LESSON_TYPES = ["video", "exercice", "quiz"] as const;
export type LessonType = (typeof LESSON_TYPES)[number];

export type Course = {
  id: string;
  teacherId: string;
  title: string;
  specialty: string;
  level: CourseLevel;
  teachingLanguage: "fr" | "en";
  isPublished: boolean;
};

export type Lesson = {
  id: string;
  courseId: string;
  title: string;
  type: LessonType;
  content: string;
  order: number;
};

/** Catalogue filters: language of instruction is always a first-class,
 * independent filter from the interface language (see CLAUDE.md). */
export type CourseCatalogueFilters = {
  specialty?: string;
  level?: CourseLevel;
  teachingLanguage?: "fr" | "en";
};
