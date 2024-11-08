import { ArtifexEntityModel } from '@inmine/artifex/models/entity/interfaces/entity-model';

import { BaseBlockModel } from '../base-block-model';

export function createUsingEntityModel<Model extends ArtifexEntityModel>(
  model: Model,
): BaseBlockModel | undefined {
  const entity = model.entity;

  return entity !== undefined
    ? new BaseBlockModel(entity.location, entity.dimension)
    : undefined;
}
