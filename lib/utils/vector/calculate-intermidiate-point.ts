import { Vector3 } from '@minecraft/server';

export const calculateIntermediatePoint = (
  start: Vector3,
  end: Vector3,
  distanceFromStart: number,
): Vector3 | undefined => {
  if (distanceFromStart < 0) {
    return;
  }

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dz = end.z - start.z;

  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  if (distance === 0 || distanceFromStart > distance) {
    return;
  }

  const intermediatePoint: Vector3 = {
    x: start.x + (dx / distance) * distanceFromStart,
    y: start.y + (dy / distance) * distanceFromStart,
    z: start.z + (dz / distance) * distanceFromStart,
  };

  return intermediatePoint;
};
