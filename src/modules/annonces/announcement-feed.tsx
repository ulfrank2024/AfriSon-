import { Megaphone } from "lucide-react";
import type { Announcement } from "./types";

export function AnnouncementFeed({
  announcements,
  locale,
  emptyLabel,
}: {
  announcements: Announcement[];
  locale: string;
  emptyLabel: string;
}) {
  if (announcements.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <ul className="space-y-3">
      {announcements.map((announcement) => (
        <li key={announcement.id} className="flex gap-3 rounded-xl border border-border bg-card p-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Megaphone className="size-4" strokeWidth={2.25} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <p className="font-medium">{announcement.title}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(announcement.createdAt).toLocaleDateString(locale, {
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{announcement.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
