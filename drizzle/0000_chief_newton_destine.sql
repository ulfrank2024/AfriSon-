CREATE TYPE "public"."application_status" AS ENUM('recu', 'en_revue', 'preselectionne', 'evaluation_planifiee', 'entretien', 'valide', 'rejete', 'en_attente_documents');--> statement-breakpoint
CREATE TYPE "public"."course_level" AS ENUM('debutant', 'intermediaire', 'avance');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('concert', 'seminaire');--> statement-breakpoint
CREATE TYPE "public"."interface_language" AS ENUM('fr', 'en');--> statement-breakpoint
CREATE TYPE "public"."lesson_type" AS ENUM('video', 'exercice', 'quiz');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('mtn_momo', 'orange_money', 'carte');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('en_attente', 'reussi', 'echoue', 'rembourse');--> statement-breakpoint
CREATE TYPE "public"."referral_status" AS ENUM('en_attente', 'recompense', 'invalide');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'en_attente', 'expiree', 'annulee');--> statement-breakpoint
CREATE TYPE "public"."subscription_tier" AS ENUM('decouverte', 'standard', 'premium');--> statement-breakpoint
CREATE TYPE "public"."teacher_field" AS ENUM('musique', 'son');--> statement-breakpoint
CREATE TYPE "public"."teaching_language" AS ENUM('fr', 'en');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('eleve', 'enseignant', 'admin', 'partenaire');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"role" "user_role" DEFAULT 'eleve' NOT NULL,
	"full_name" text NOT NULL,
	"country" text NOT NULL,
	"interface_language" "interface_language" DEFAULT 'fr' NOT NULL,
	"email" text,
	"phone" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teacher_applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"field" "teacher_field" NOT NULL,
	"teaching_languages" "teaching_language"[] NOT NULL,
	"status" "application_status" DEFAULT 'recu' NOT NULL,
	"documents" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"internal_notes" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacher_id" uuid NOT NULL,
	"title" text NOT NULL,
	"specialty" text NOT NULL,
	"level" "course_level" DEFAULT 'debutant' NOT NULL,
	"teaching_language" "teaching_language" NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"course_id" uuid NOT NULL,
	"title" text NOT NULL,
	"type" "lesson_type" NOT NULL,
	"content" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"student_id" uuid NOT NULL,
	"tier" "subscription_tier" NOT NULL,
	"price" integer NOT NULL,
	"currency" text DEFAULT 'XAF' NOT NULL,
	"status" "subscription_status" DEFAULT 'en_attente' NOT NULL,
	"started_at" timestamp with time zone,
	"ends_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subscription_id" uuid NOT NULL,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'XAF' NOT NULL,
	"method" "payment_method" NOT NULL,
	"status" "payment_status" DEFAULT 'en_attente' NOT NULL,
	"flutterwave_tx_ref" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"referrer_id" uuid NOT NULL,
	"referred_id" uuid NOT NULL,
	"code" text NOT NULL,
	"status" "referral_status" DEFAULT 'en_attente' NOT NULL,
	"reward" text,
	"triggered_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "live_session_participants" (
	"live_session_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"registered_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "live_session_participants_live_session_id_student_id_pk" PRIMARY KEY("live_session_id","student_id")
);
--> statement-breakpoint
CREATE TABLE "live_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacher_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"scheduled_at" timestamp with time zone NOT NULL,
	"agora_channel" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "event_participants" (
	"event_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"registered_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "event_participants_event_id_user_id_pk" PRIMARY KEY("event_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "event_type" NOT NULL,
	"country" text NOT NULL,
	"venue" text NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"capacity" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partner_institution_members" (
	"partner_institution_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "partner_institution_members_partner_institution_id_user_id_pk" PRIMARY KEY("partner_institution_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "partner_institutions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"country" text NOT NULL,
	"offer" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "teacher_applications" ADD CONSTRAINT "teacher_applications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referrer_id_users_id_fk" FOREIGN KEY ("referrer_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrals" ADD CONSTRAINT "referrals_referred_id_users_id_fk" FOREIGN KEY ("referred_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "live_session_participants" ADD CONSTRAINT "live_session_participants_live_session_id_live_sessions_id_fk" FOREIGN KEY ("live_session_id") REFERENCES "public"."live_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "live_session_participants" ADD CONSTRAINT "live_session_participants_student_id_users_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "live_sessions" ADD CONSTRAINT "live_sessions_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "live_sessions" ADD CONSTRAINT "live_sessions_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_participants" ADD CONSTRAINT "event_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partner_institution_members" ADD CONSTRAINT "partner_institution_members_partner_institution_id_partner_institutions_id_fk" FOREIGN KEY ("partner_institution_id") REFERENCES "public"."partner_institutions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "partner_institution_members" ADD CONSTRAINT "partner_institution_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "users_clerk_id_idx" ON "users" USING btree ("clerk_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "referrals_referred_id_idx" ON "referrals" USING btree ("referred_id");