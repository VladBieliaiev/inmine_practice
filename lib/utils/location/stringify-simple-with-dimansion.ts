import { Dimension, Vector3 } from '@minecraft/server';

import { overworld } from '@inmine/common/constants/dimension';
import { SimpleLocationWithDimensionAsString } from '@inmine/common/types';

import { simple } from './simple';
import { rawDimensionId } from '../dimension/raw-dimension-id';

/**
 * @returns Simplified position as string with dimension type.
 */
export function stringifySimpleWithDimension(
  location: Vector3,
  dimension: Dimension = overworld,
): SimpleLocationWithDimensionAsString {
  const simpleLocation = simple(location);

  return `${simpleLocation.x},${simpleLocation.y},${simpleLocation.z},${rawDimensionId(dimension)}`;
}
