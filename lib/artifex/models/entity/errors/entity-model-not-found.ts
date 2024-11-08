import { Entity } from '@minecraft/server';

import { ArtifexLogger } from '@inmine/artifex/tools/logger/logger';

export const EntityModelNotFoundError = (entity: Entity) => {
  return (
    ArtifexLogger.prefix,
    `Entity model not found for entity type ${entity.typeId}. Id:${entity.id}`
  );
};
