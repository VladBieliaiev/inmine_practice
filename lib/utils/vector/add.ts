import { Vector3 } from '@minecraft/server';

/**
 * Adds two vectors.
 */
export const add = (fVector: Vector3, sVector: Vector3) => {
  return {
    x: fVector.x + sVector.x,
    y: fVector.y + sVector.y,
    z: fVector.z + sVector.z,
  };
};
