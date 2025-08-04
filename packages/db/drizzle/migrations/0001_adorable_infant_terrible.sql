CREATE TABLE "zap_run " (
	"id" uuid PRIMARY KEY NOT NULL,
	"zap_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "zap_run " ADD CONSTRAINT "zap_run _zap_id_zaps_id_fk" FOREIGN KEY ("zap_id") REFERENCES "public"."zaps"("id") ON DELETE no action ON UPDATE no action;