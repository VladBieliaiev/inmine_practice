import { Entity } from '@minecraft/server';

import { ArtifexLogger } from '@inmine/artifex/tools/logger/logger';

import { ArtifexEntityModelBase } from '../entity-model';

export const EntityCouldntBeAssinedToModelError = (
  entity: Entity,
  model: ArtifexEntityModelBase,
) => {
  return (
    ArtifexLogger.prefix,
    `Entity ${entity.id} couldn't be assigned to model ${model.constructor.name}, because it's not valid.`
  );
};
