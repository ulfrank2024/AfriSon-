"use client";

import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTeacherApplication } from "./update-teacher-application";
import { APPLICATION_STATUSES, type ApplicationStatus } from "./types";

export function ApplicationStatusForm({
  id,
  status,
  notes,
}: {
  id: string;
  status: ApplicationStatus;
  notes: string | null;
}) {
  const t = useTranslations("adminApplications");

  return (
    <form
      action={updateTeacherApplication}
      className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end"
    >
      <input type="hidden" name="id" value={id} />

      <div className="space-y-1.5">
        <Label htmlFor={`status-${id}`}>{t("fields.status")}</Label>
        <Select name="status" defaultValue={status}>
          <SelectTrigger id={`status-${id}`} className="w-full sm:w-56">
            <SelectValue>
              {(value: ApplicationStatus | null) => (value ? t(`statuses.${value}`) : "")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {APPLICATION_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {t(`statuses.${s}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 space-y-1.5">
        <Label htmlFor={`notes-${id}`}>{t("fields.notes")}</Label>
        <Textarea
          id={`notes-${id}`}
          name="internalNotes"
          defaultValue={notes ?? ""}
          placeholder={t("fields.notesPlaceholder")}
          rows={2}
        />
      </div>

      <Button type="submit">{t("fields.save")}</Button>
    </form>
  );
}
