import { Vector3 } from '@minecraft/server';

export const DEG_TO_RAD = Math.PI / 180;

export const RAD_TO_DEG = 180 / Math.PI;

export const nullVector3: Vector3 = { x: 0, y: 0, z: 0 };

export const directionVectors = {
  south: { x: 0, y: 0, z: 1 },
  north: { x: 0, y: 0, z: -1 },
  east: { x: 1, y: 0, z: 0 },
  west: { x: -1, y: 0, z: 0 },
};
