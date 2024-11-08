import { Vector3 } from '@minecraft/server';

export const calculateDistance = (org: Vector3, dest: Vector3) => {
  return Math.hypot(org.x - dest.x, org.y - dest.y, org.z - dest.z);
};
