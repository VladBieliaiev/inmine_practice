import { Entity } from '@minecraft/server';

import { VectorModel } from '../vector-model';

export function createUsingEntity(entity: Entity): VectorModel | undefined {
  return entity.isValid()
    ? new VectorModel(entity.location, entity.getViewDirection())
    : undefined;
}
