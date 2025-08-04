import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  users,
  zaps,
  actions,
  availableTriggers,
  avaiableActions,
  triggers,
} from "./schema";

export type User = InferSelectModel<typeof users>;
export type Zap = InferSelectModel<typeof zaps>;
export type Action = InferSelectModel<typeof actions>;
export type Trigger = InferSelectModel<typeof triggers>;
export type AvailableTrigger = InferSelectModel<typeof availableTriggers>;
export type AvailableActions = InferSelectModel<typeof avaiableActions>;

export type NewUser = InferInsertModel<typeof users>;
export type NewZap = InferInsertModel<typeof zaps>;
export type NewAction = InferInsertModel<typeof actions>;
export type NewTrigger = InferInsertModel<typeof triggers>;
export type NewAvailableTrigger = InferInsertModel<typeof availableTriggers>;
export type NewAvailableAction = InferInsertModel<typeof avaiableActions>;
