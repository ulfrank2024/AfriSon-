CREATE TYPE "public"."course_status" AS ENUM('brouillon', 'en_revue', 'publie', 'rejete');--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "status" "course_status" DEFAULT 'brouillon' NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "admin_notes" text;