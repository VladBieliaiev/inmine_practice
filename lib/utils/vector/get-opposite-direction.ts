import { DirectionName } from '@inmine/common/types';

/**
 * @returns Opposite direction name. Example: East -> West
 */
export function getOppositeDirection(
  directionName: DirectionName,
): DirectionName {
  switch (directionName) {
    case 'East':
      return 'West';
    case 'West':
      return 'East';
    case 'Up':
      return 'Down';
    case 'Down':
      return 'Up';
    case 'South':
      return 'North';
    case 'North':
      return 'South';
    default:
      return 'North';
  }
}
