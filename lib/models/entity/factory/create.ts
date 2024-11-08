import { Entity } from '@minecraft/server';

import { CreatableClass } from '@inmine/common/types/base/creatable-class';
import { EntityModelImage } from '@inmine/common/types/models/entity-model/entity-image';

import { InMineAbstractEntityModel } from '../entity-abstract-model';

export function create<M extends InMineAbstractEntityModel<EntityModelImage>>(
  entity: Entity,
  model: CreatableClass<M>,
  silent: boolean = true,
): M | undefined {
  return new model().setEntity(entity, silent);
}
