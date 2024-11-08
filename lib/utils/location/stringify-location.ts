import { Vector3 } from '@minecraft/server';

/**
 * @returns Location as string.
 */
export function stringifyLocation(location: Vector3): string {
  return JSON.stringify(location);
}
