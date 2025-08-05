CREATE TABLE "actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"zap_id" uuid NOT NULL,
	"action_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "available_actions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "available_triggers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "triggers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"zap_id" uuid NOT NULL,
	"selected_trigger_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"name" text,
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "zap_run_out_boxs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"zap_run_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zap_runs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"metaData" json,
	"zap_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zaps" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_Id" serial NOT NULL,
	"trigger_id" uuid
);
--> statement-breakpoint
ALTER TABLE "actions" ADD CONSTRAINT "actions_zap_id_zaps_id_fk" FOREIGN KEY ("zap_id") REFERENCES "public"."zaps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "actions" ADD CONSTRAINT "actions_action_id_available_actions_id_fk" FOREIGN KEY ("action_id") REFERENCES "public"."available_actions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "triggers" ADD CONSTRAINT "triggers_zap_id_zaps_id_fk" FOREIGN KEY ("zap_id") REFERENCES "public"."zaps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "triggers" ADD CONSTRAINT "triggers_selected_trigger_id_available_triggers_id_fk" FOREIGN KEY ("selected_trigger_id") REFERENCES "public"."available_triggers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zap_run_out_boxs" ADD CONSTRAINT "zap_run_out_boxs_zap_run_id_zap_runs_id_fk" FOREIGN KEY ("zap_run_id") REFERENCES "public"."zap_runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zap_runs" ADD CONSTRAINT "zap_runs_zap_id_zaps_id_fk" FOREIGN KEY ("zap_id") REFERENCES "public"."zaps"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zaps" ADD CONSTRAINT "zaps_user_Id_users_id_fk" FOREIGN KEY ("user_Id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;