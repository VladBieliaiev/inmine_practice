import { Dimension } from '@minecraft/server';

import { VectorModel } from '@inmine/models/vector/vector-model';

import { BaseBlockModel } from '../base-block-model';

export function createUsingVector(
  vectorModel: VectorModel,
  dimension: Dimension,
): BaseBlockModel | undefined {
  return new BaseBlockModel(vectorModel.location, dimension);
}
