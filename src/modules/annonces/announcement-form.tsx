"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createAnnouncement, type CreateAnnouncementResult } from "./create-announcement";
import { ANNOUNCEMENT_AUDIENCES, type AnnouncementAudience } from "./types";

const initialState: CreateAnnouncementResult | null = null;

export function AnnouncementForm() {
  const t = useTranslations("adminAnnouncements");
  const [state, formAction, isPending] = useActionState(createAnnouncement, initialState);

  return (
    <form action={formAction} className="space-y-4 rounded-xl border border-border bg-card p-5">
      <div className="space-y-2">
        <Label htmlFor="title">{t("fields.title")}</Label>
        <Input id="title" name="title" required minLength={3} maxLength={120} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="body">{t("fields.body")}</Label>
        <Textarea id="body" name="body" required minLength={3} maxLength={2000} rows={4} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="audience">{t("fields.audience")}</Label>
        <Select name="audience" defaultValue="tous">
          <SelectTrigger id="audience" className="w-full sm:w-56">
            <SelectValue>
              {(value: AnnouncementAudience | null) => (value ? t(`audiences.${value}`) : "")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {ANNOUNCEMENT_AUDIENCES.map((audience) => (
              <SelectItem key={audience} value={audience}>
                {t(`audiences.${audience}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isPending}>
        {t("create.submit")}
      </Button>

      {state?.ok === false && <p className="text-sm font-medium text-destructive">{t("create.error")}</p>}
    </form>
  );
}
