import { Direction, Vector3 } from '@minecraft/server';

/**
 * Vector3 object. Returns from Entity.getViewDirection() function.
 */
export type DirectionVector = Vector3;

export type DirectionName = keyof typeof Direction;
