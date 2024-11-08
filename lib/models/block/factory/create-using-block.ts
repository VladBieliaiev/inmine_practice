import { Block } from '@minecraft/server';

import { BaseBlockModel } from '../base-block-model';

export function createUsingBlock(block: Block): BaseBlockModel | undefined {
  return block.isValid()
    ? new BaseBlockModel(block.location, block.dimension)
    : undefined;
}
