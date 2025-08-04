ALTER TABLE "triggers" DROP CONSTRAINT "triggers_trigger_id_available_triggers_id_fk";
--> statement-breakpoint
ALTER TABLE "triggers" ADD COLUMN "selected_trigger_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "triggers" ADD CONSTRAINT "triggers_selected_trigger_id_available_triggers_id_fk" FOREIGN KEY ("selected_trigger_id") REFERENCES "public"."available_triggers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "triggers" DROP COLUMN "trigger_id";