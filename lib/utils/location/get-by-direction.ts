import { Vector3 } from '@minecraft/server';

import { DirectionName } from '@inmine/common/types';

/**
 * @returns A new location based on the direction.
 */
export function getByDirection(location: Vector3, direction: DirectionName) {
  const result = { ...location };

  switch (direction) {
    case 'Down':
      result.y -= 1;
      break;
    case 'Up':
      result.y += 1;
      break;
    case 'East':
      result.x += 1;
      break;
    case 'West':
      result.x -= 1;
      break;
    case 'South':
      result.z += 1;
      break;
    case 'North':
      result.z -= 1;
      break;
    default:
      break;
  }

  return result;
}
