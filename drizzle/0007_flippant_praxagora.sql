CREATE TABLE "subscription_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tier" "subscription_tier" NOT NULL,
	"price_xaf" integer DEFAULT 0 NOT NULL,
	"live_included" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "subscription_plans_tier_idx" ON "subscription_plans" USING btree ("tier");