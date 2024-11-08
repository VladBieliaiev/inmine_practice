import { Vector3 } from '@minecraft/server';

import { nullVector3 } from '@inmine/common/constants';
import { DirectionName } from '@inmine/common/types';

/**
 * @returns Direction name as 'North', 'South', 'East', 'West', 'Up' or 'Down'.
 */
export function stringifyDirectionSimple(
  directionVector: Vector3 = nullVector3,
): DirectionName {
  const { x, y, z } = directionVector;
  const absX = Math.abs(x);
  const absY = Math.abs(y);
  const absZ = Math.abs(z);

  if (absX > absY && absX > absZ) {
    return x > 0 ? 'East' : 'West';
  } else if (absY > absX && absY > absZ) {
    return y > 0 ? 'Up' : 'Down';
  } else {
    return z > 0 ? 'South' : 'North';
  }
}
