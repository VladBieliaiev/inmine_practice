import {
  BlockEventOptions,
  EntityDataDrivenTriggerEventOptions,
  EntityEventOptions,
  ScriptEventMessageFilterOptions,
} from '@minecraft/server';

export type MinecraftEventFilters =
  | BlockEventOptions
  | EntityDataDrivenTriggerEventOptions
  | EntityEventOptions
  | ScriptEventMessageFilterOptions;
