"use client";

import { useActionState, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ImageOff, Link2, Upload } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { createAnnouncement, type CreateAnnouncementResult } from "./create-announcement";
import { ANNOUNCEMENT_AUDIENCES, type AnnouncementAudience } from "./types";

const initialState: CreateAnnouncementResult | null = null;

export function AnnouncementForm() {
  const t = useTranslations("adminAnnouncements");
  const formRef = useRef<HTMLFormElement>(null);
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [preview, setPreview] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState(async (
    prevState: CreateAnnouncementResult | null,
    formData: FormData,
  ) => {
    const result = await createAnnouncement(prevState, formData);
    if (result.ok) {
      formRef.current?.reset();
      setPreview(null);
    }
    return result;
  }, initialState);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview(null);
      return;
    }
    setPreview(URL.createObjectURL(file));
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-4 rounded-xl border border-border bg-card p-5">
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

      <div className="space-y-2">
        <Label>{t("fields.image")}</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setImageMode("upload")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              imageMode === "upload"
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            <Upload className="size-3.5" />
            {t("fields.imageUpload")}
          </button>
          <button
            type="button"
            onClick={() => setImageMode("url")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
              imageMode === "url"
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            <Link2 className="size-3.5" />
            {t("fields.imageLink")}
          </button>
        </div>

        {imageMode === "upload" ? (
          <Input
            key="upload"
            type="file"
            name="imageFile"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleFileChange}
          />
        ) : (
          <Input
            key="url"
            type="url"
            name="imageUrl"
            placeholder="https://..."
            onChange={(e) => setPreview(e.target.value || null)}
          />
        )}
        <p className="text-xs text-muted-foreground">{t("fields.imageHint")}</p>

        {preview && (
          <div className="relative mt-2 h-32 w-full overflow-hidden rounded-lg border border-border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary uploaded/external URL, not an optimizable static asset */}
            <img
              src={preview}
              alt=""
              className="size-full object-cover"
              onError={() => setPreview(null)}
            />
          </div>
        )}
        {imageMode === "url" && !preview && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <ImageOff className="size-3.5" />
            {t("fields.imageNoPreview")}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {t("create.submit")}
      </Button>

      {state?.ok === false && <p className="text-sm font-medium text-destructive">{t("create.error")}</p>}
    </form>
  );
}
