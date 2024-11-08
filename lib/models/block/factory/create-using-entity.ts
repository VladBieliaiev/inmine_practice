import { Entity } from '@minecraft/server';

import { BaseBlockModel } from '../base-block-model';

export function createUsingEntity(entity: Entity): BaseBlockModel | undefined {
  return entity.isValid()
    ? new BaseBlockModel(entity.location, entity.dimension)
    : undefined;
}
