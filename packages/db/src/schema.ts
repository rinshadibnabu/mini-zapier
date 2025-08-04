import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  uuid,
  text,
  varchar,
  json,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  name: text(),
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});
export const userRelations = relations(users, ({ many }) => ({
  zaps: many(zaps),
}));
export const zaps = pgTable("zaps", {
  id: uuid("id").notNull().primaryKey(),
  userId: serial("user_Id").references(() => users.id),
  triggerId: uuid("trigger_id"),
});
export const zapsRelations = relations(zaps, ({ one, many }) => ({
  trigger: one(triggers, {
    fields: [zaps.triggerId],
    references: [triggers.id],
  }),
  actions: many(actions),
  zapRuns: many(zapRuns),
}));
export const triggers = pgTable("triggers", {
  id: uuid("id").notNull().primaryKey(),
  zapId: uuid("zap_id")
    .notNull()
    .references(() => zaps.id),
  triggerId: uuid("trigger_id")
    .notNull()
    .references(() => availableTriggers.id),
});

export const availableTriggers = pgTable("available_triggers", {
  id: uuid("id").notNull().primaryKey(),
  name: text("name"),
});

export const availableTriggersRelation = relations(
  availableTriggers,
  ({ many }) => ({
    triggers: many(triggers),
  }),
);

export const actions = pgTable("actions", {
  id: uuid("id").notNull().primaryKey(),
  zapId: uuid("zap_id")
    .notNull()
    .references(() => zaps.id),
  actionId: uuid("action_id")
    .notNull()
    .references(() => avaiableActions.id),
});

export const avaiableActions = pgTable("available_actions", {
  id: uuid("id").notNull().primaryKey(),
  name: text(),
});

export const avaiableActionsRelation = relations(
  avaiableActions,
  ({ many }) => ({
    actions: many(actions),
  }),
);

export const zapRuns = pgTable("zap_runs", {
  id: uuid("id").notNull().primaryKey(),
  metaData: json(),
  zapId: uuid("zap_id")
    .notNull()
    .references(() => zaps.id),
});
export const zapRunRelation = pgTable("zap_run_relations", {
  id: uuid("id").notNull().primaryKey(),
});
export const zapRunOutBoxs = pgTable("zap_run_out_boxs", {
  id: uuid().notNull().primaryKey(),
  zapRunId: uuid("zap_run_id")
    .notNull()
    .references(() => zapRuns.id),
});
