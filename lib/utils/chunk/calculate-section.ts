import { Dimension, Vector3 } from '@minecraft/server';

import { chunkSize } from '@inmine/common/constants';
import { overworld } from '@inmine/common/constants/dimension';
import { ChunkSection, DimensionTypes } from '@inmine/common/types';

/**
 * @returns Chunk section usinf location and dimension.
 */
export const calculateSection = (
  location: Vector3,
  dimension: Dimension = overworld,
): ChunkSection => {
  const dimensionId = dimension.id as DimensionTypes;

  return {
    x: Math.floor(location.x / chunkSize),
    y: Math.floor(location.y / chunkSize),
    z: Math.floor(location.z / chunkSize),
    dimensionId: dimensionId,
  };
};
