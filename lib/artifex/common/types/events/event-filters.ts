import { ScriptEventMessageFilterOptions } from '@minecraft/server';

import { MinecraftEventFilters } from './minecraft-event-filters';

export type ArtifexEventFilters =
  | MinecraftEventFilters
  | ScriptEventMessageFilterOptions;
