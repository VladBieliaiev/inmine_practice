import { Vector3 } from '@minecraft/server';

import { DimensionTypes } from '../dimension';

export type ChunkSection = Vector3 & {
  dimensionId: DimensionTypes;
};
