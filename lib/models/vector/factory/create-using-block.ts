import { Block } from '@minecraft/server';

import { VectorModel } from '../vector-model';

export function createUsingBlock(block: Block): VectorModel | undefined {
  return block.isValid() ? new VectorModel(block.location) : undefined;
}
