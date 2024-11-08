import { Dimension, Vector3 } from '@minecraft/server';

import { BaseBlockModel } from '../base-block-model';

/**
 * Creates a new Base Block model.
 */
export function create(
  location: Vector3,
  dimension: Dimension,
): BaseBlockModel {
  return new BaseBlockModel(location, dimension);
}
