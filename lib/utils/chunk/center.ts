import { Vector3 } from '@minecraft/server';

import { chunkSize } from '@inmine/common/constants';
import { ChunkSection } from '@inmine/common/types';

/**
 * @returns Chunk center location.
 */
export const center = (section: ChunkSection): Vector3 => {
  return {
    x: (section.x + 0.5) * chunkSize,
    y: (section.y + 0.5) * chunkSize,
    z: (section.z + 0.5) * chunkSize,
  };
};
