import { Yaw, YawAsDirection } from '@inmine/common/types';

/**
 * @returns Location model yaw as 'north', 'south', 'east', 'west', 'south_east', 'south_west', 'north_west', 'north_east' or 'unknown'.
 */
export function stringifyYaw(yaw: Yaw = 0): YawAsDirection | undefined {
  if (yaw >= -22.5 && yaw < 22.5) {
    return 'East';
  } else if (yaw >= 22.5 && yaw < 67.5) {
    return 'South_East';
  } else if (yaw >= 67.5 && yaw < 112.5) {
    return 'South';
  } else if (yaw >= 112.5 && yaw < 157.5) {
    return 'South_West';
  } else if (yaw >= 157.5 || yaw < -157.5) {
    return 'West';
  } else if (yaw >= -157.5 && yaw < -112.5) {
    return 'North_West';
  } else if (yaw >= -112.5 && yaw < -67.5) {
    return 'North';
  } else if (yaw >= -67.5 && yaw < -22.5) {
    return 'North_East';
  }
  return undefined;
}
