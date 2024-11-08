import { Dimension, Vector3 } from '@minecraft/server';

/**
 * @returns Validated location using input dimension height.
 */
export function validateHeight(location: Vector3, dimension: Dimension) {
  const { y } = location;

  return {
    ...location,
    y:
      y > dimension.heightRange.max
        ? dimension.heightRange.max
        : y < dimension.heightRange.min
          ? dimension.heightRange.min
          : y,
  };
}
