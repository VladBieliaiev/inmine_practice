import { Entity } from '@minecraft/server';

import { Identifier } from '@inmine/common';
import { ArtifexLogger } from '@inmine/artifex/tools/logger/logger';

export const InvalidEntityTypeIdError = (
  entity: Entity,
  typeId: Identifier,
) => {
  return (
    ArtifexLogger.prefix,
    `Entity typeId ${entity.typeId} does not match model ${typeId}. Entity: ${entity.id}`
  );
};
