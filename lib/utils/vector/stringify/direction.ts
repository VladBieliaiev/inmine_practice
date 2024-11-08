import { Pitch, Yaw } from '@inmine/common/types';

import { stringifyYaw } from './yaw';

/**
 * @returns Direction as string with all possible direction names.
 */
export function stringifyDirection(
  yaw: Yaw = 0,
  pitch: Pitch = 0,
): string | undefined {
  return pitch >= -45 && pitch < 45
    ? stringifyYaw(yaw)
    : pitch >= 45
      ? `Down_${stringifyYaw(yaw)}`
      : pitch < -45
        ? `Up_${stringifyYaw(yaw)}`
        : undefined;
}
