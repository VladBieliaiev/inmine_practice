import { Vector3 } from '@minecraft/server';

/**
 * @returns The Location model above this location based on pitch and yaw.
 */
export function down(location: Vector3, distance: number = 1): Vector3 {
  return {
    ...location,
    y: location.y - distance,
  };
}
