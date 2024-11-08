import { Vector3 } from '@minecraft/server';

import { DEG_TO_RAD } from '@inmine/common/constants';
import { Pitch, Yaw } from '@inmine/common/types';

/**
 * @returns Direction Vector using vertical (pitch) and horizontal (yaw) rotation degrees input.
 */
export function calculateRotationVector(yaw: Yaw, pitch: Pitch): Vector3 {
  const pitchInRad = pitch * DEG_TO_RAD;
  const yawInRad = yaw * DEG_TO_RAD;

  const xz = Math.cos(pitchInRad);

  return {
    x: -xz * Math.sin(yawInRad),
    y: -Math.sin(pitchInRad),
    z: xz * Math.cos(yawInRad),
  };
}
