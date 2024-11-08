import { Dimension, Vector3 } from '@minecraft/server';

import { CreatableClass } from '@inmine/common/types/base/creatable-class';
import { EntityModelImage } from '@inmine/common/types/models/entity-model/entity-image';

import { InMineAbstractEntityModel } from '../entity-abstract-model';

export function spawnAndCreate<
  M extends InMineAbstractEntityModel<EntityModelImage>,
>(location: Vector3, dimension: Dimension, model: CreatableClass<M>) {
  const modelSkeleton = new model();

  return modelSkeleton.setEntity(
    dimension.spawnEntity(modelSkeleton.id, location),
    true,
  );
}
