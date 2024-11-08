import { Entity } from '@minecraft/server';

import { ArtifexLogger } from '@inmine/artifex/tools/logger/logger';

export const InvalidEntityError = (entity: Entity) => {
  return ArtifexLogger.prefix, `Entity ${entity.id} is not valid.`;
};
