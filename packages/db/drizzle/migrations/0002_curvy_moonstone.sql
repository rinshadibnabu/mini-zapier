CREATE TABLE "zap_run_out_boxs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"zap_run_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zap_run_relations" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zap_runs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"metaData" json,
	"zap_id" uuid NOT NULL
);
--> statement-breakpoint
DROP TABLE "zap_run " CASCADE;--> statement-breakpoint
ALTER TABLE "zap_run_out_boxs" ADD CONSTRAINT "zap_run_out_boxs_zap_run_id_zap_runs_id_fk" FOREIGN KEY ("zap_run_id") REFERENCES "public"."zap_runs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "zap_runs" ADD CONSTRAINT "zap_runs_zap_id_zaps_id_fk" FOREIGN KEY ("zap_id") REFERENCES "public"."zaps"("id") ON DELETE no action ON UPDATE no action;