import { Vector3 } from '@minecraft/server';

import { nullVector3 } from '@inmine/common/constants';

/**
 * @returns The location below this location based on pitch and yaw
 */
export function up(
  location: Vector3 = nullVector3,
  distance: number = 1,
): Vector3 {
  return {
    ...location,
    y: location.y + distance,
  };
}
