import { Block } from '@minecraft/server';

import { BlockJson } from '@inmine/common/types';

import { BlockAbstractModel } from '../block-abstract-model';

export function createConcreteModel<
  Model extends BlockAbstractModel<BlockJson>,
>(block: Block, model: Model): Model | undefined {
  return;
}
