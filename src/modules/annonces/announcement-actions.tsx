"use client";

import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { toggleAnnouncementPublished } from "./toggle-announcement-published";
import { deleteAnnouncement } from "./delete-announcement";

export function AnnouncementActions({ id, isPublished }: { id: string; isPublished: boolean }) {
  const t = useTranslations("adminAnnouncements");

  return (
    <div className="flex items-center gap-2">
      <form action={toggleAnnouncementPublished}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="nextValue" value={(!isPublished).toString()} />
        <Button type="submit" variant={isPublished ? "outline" : "default"} size="sm">
          {isPublished ? t("unpublish") : t("publish")}
        </Button>
      </form>
      <form action={deleteAnnouncement}>
        <input type="hidden" name="id" value={id} />
        <Button type="submit" variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-destructive">
          <Trash2 className="size-4" />
          <span className="sr-only">{t("delete")}</span>
        </Button>
      </form>
    </div>
  );
}
