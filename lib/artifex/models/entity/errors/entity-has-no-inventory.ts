import { Entity } from '@minecraft/server';

import { ArtifexLogger } from '@inmine/artifex/tools/logger/logger';

export const EntityHasNoInventoryError = (entity: Entity) => {
  return ArtifexLogger.prefix, `Entity ${entity.id} has no inventory.`;
};
