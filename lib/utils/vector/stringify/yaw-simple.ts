import { Vector3 } from '@minecraft/server';

import { nullVector3 } from '@inmine/common/constants';
import { YawAsDirectionSimple } from '@inmine/common/types';

/**
 * @returns Yaw as 'North', 'South', 'East', or 'West'.
 */
export function stringifyYawSimple(
  directionVector: Vector3 = nullVector3,
): YawAsDirectionSimple {
  const { x, z } = directionVector;
  const absX = Math.abs(x);
  const absZ = Math.abs(z);

  if (absX > absZ) {
    return x > 0 ? 'East' : 'West';
  } else {
    return z > 0 ? 'South' : 'North';
  }
}
