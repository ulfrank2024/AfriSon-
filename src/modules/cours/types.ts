export const COURSE_LEVELS = ["debutant", "intermediaire", "avance"] as const;
export type CourseLevel = (typeof COURSE_LEVELS)[number];

export const LESSON_TYPES = ["video", "exercice", "quiz"] as const;
export type LessonType = (typeof LESSON_TYPES)[number];

/** brouillon: teacher is still editing. en_revue: submitted, awaiting
 * admin review of the content (incl. video links). publie: validated,
 * visible in the student catalogue. rejete: admin sent it back with
 * notes — teacher can edit and resubmit. */
export const COURSE_STATUSES = ["brouillon", "en_revue", "publie", "rejete"] as const;
export type CourseStatus = (typeof COURSE_STATUSES)[number];

export type Course = {
  id: string;
  teacherId: string;
  title: string;
  specialty: string;
  level: CourseLevel;
  teachingLanguage: "fr" | "en";
  status: CourseStatus;
  adminNotes: string | null;
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
