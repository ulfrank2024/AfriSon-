export const ANNOUNCEMENT_AUDIENCES = ["tous", "eleve", "enseignant"] as const;
export type AnnouncementAudience = (typeof ANNOUNCEMENT_AUDIENCES)[number];

export type Announcement = {
  id: string;
  authorId: string;
  title: string;
  body: string;
  imageUrl: string | null;
  audience: AnnouncementAudience;
  isPublished: boolean;
  createdAt: Date;
};
