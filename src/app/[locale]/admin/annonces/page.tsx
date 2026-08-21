import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { getAnnouncementsForAdmin } from "@/modules/annonces/get-announcements-for-admin";
import { AnnouncementForm } from "@/modules/annonces/announcement-form";
import { AnnouncementActions } from "@/modules/annonces/announcement-actions";

export default async function AdminAnnouncementsPage() {
  const appUser = await requireAppUser("admin");
  const t = await getTranslations("adminAnnouncements");
  const list = await getAnnouncementsForAdmin();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-10">
      <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("description")}</p>

      <h2 className="mt-8 text-sm font-semibold">{t("create.title")}</h2>
      <div className="mt-3">
        <AnnouncementForm />
      </div>

      <h2 className="mt-10 text-sm font-semibold">{t("list.title")}</h2>
      {list.length === 0 ? (
        <p className="mt-2 text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {list.map((announcement) => (
            <li key={announcement.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  {announcement.imageUrl && (
                    <span className="size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary uploaded/external URL, not an optimizable static asset */}
                      <img src={announcement.imageUrl} alt="" className="size-full object-cover" />
                    </span>
                  )}
                  <div>
                    <p className="font-medium">{announcement.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{announcement.body}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{t(`audiences.${announcement.audience}`)}</Badge>
                  <Badge variant={announcement.isPublished ? "default" : "secondary"}>
                    {announcement.isPublished ? t("published") : t("unpublished")}
                  </Badge>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {new Date(announcement.createdAt).toLocaleDateString(
                    appUser?.interfaceLanguage === "en" ? "en-US" : "fr-FR",
                    { day: "numeric", month: "long", year: "numeric" },
                  )}
                </p>
                <AnnouncementActions id={announcement.id} isPublished={announcement.isPublished} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
