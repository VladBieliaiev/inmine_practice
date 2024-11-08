import { Vector3 } from '@minecraft/server';

import { chunkSize } from '@inmine/common/constants';
import { ChunkSection } from '@inmine/common/types';

/**
 * @returns Chunk min corner.
 */
export const calculateCorner = (section: ChunkSection): Vector3 => {
  return {
    x: section.x * chunkSize,
    y: section.y * chunkSize,
    z: section.z * chunkSize,
  };
};
