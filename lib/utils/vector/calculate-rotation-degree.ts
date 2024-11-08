import { Vector3 } from '@minecraft/server';

import { RAD_TO_DEG } from '@inmine/common/constants';
import { Rotation } from '@inmine/common/types';

/**
 * @returns Vertical (pitch) and horizontal (yaw) rotation in degree using Direction Vector input.
 */
export function calculateRotationDegree(direction: Vector3): Rotation {
  const { x, y, z } = direction;
  let pitch = Math.asin(-y);
  let yaw = -Math.acos(z / Math.cos(pitch)) * RAD_TO_DEG;
  if (x < 0) {
    yaw *= -1;
  }
  pitch *= RAD_TO_DEG;

  return { yaw, pitch };
}
