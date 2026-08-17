ALTER TABLE "teacher_applications" DROP CONSTRAINT "teacher_applications_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "teacher_applications" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "teacher_applications" ADD COLUMN "full_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "teacher_applications" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "teacher_applications" ADD COLUMN "phone" text NOT NULL;--> statement-breakpoint
ALTER TABLE "teacher_applications" ADD COLUMN "country" text NOT NULL;--> statement-breakpoint
ALTER TABLE "teacher_applications" ADD COLUMN "motivation" text NOT NULL;--> statement-breakpoint
ALTER TABLE "teacher_applications" ADD CONSTRAINT "teacher_applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;