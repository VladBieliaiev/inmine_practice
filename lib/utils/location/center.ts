import { Vector3 } from '@minecraft/server';

/**
 * @returns The location at the center of the block this location is on.
 */
export function center(location: Vector3): Vector3 {
  return {
    x: Math.floor(location.x) + 0.5,
    y: Math.floor(location.y) + 0.5,
    z: Math.floor(location.z) + 0.5,
  };
}
