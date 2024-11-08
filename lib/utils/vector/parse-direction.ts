import { Vector3 } from '@minecraft/server';

import { DirectionName } from '@inmine/common/types';

/**
 * @returns Direction Vector using Direction Name input.
 */
export function parseDirection(directionName: DirectionName): Vector3 {
  switch (directionName) {
    case 'East':
      return { x: 1, y: 0, z: 0 };
    case 'West':
      return { x: -1, y: 0, z: 0 };
    case 'Up':
      return { x: 0, y: 1, z: 0 };
    case 'Down':
      return { x: 0, y: -1, z: 0 };
    case 'South':
      return { x: 0, y: 0, z: 1 };
    case 'North':
      return { x: 0, y: 0, z: -1 };
    default:
      return { x: 0, y: 0, z: 0 };
  }
}
