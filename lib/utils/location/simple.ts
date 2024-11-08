import { Vector3 } from '@minecraft/server';

/**
 * @returns A simple version of the location's coordinates.
 * For example: { x: 1, y: 2, z: 3 }
 */
export function simple(location: Vector3): Vector3 {
  return {
    x: Math.floor(location.x),
    y: Math.floor(location.y),
    z: Math.floor(location.z),
  };
}
