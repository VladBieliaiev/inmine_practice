import {
  Block,
  ExplosionAfterEvent,
  ExplosionBeforeEvent,
} from '@minecraft/server';

import { DimensionTypes, Identifier } from '@inmine/common/types';
import { rawDimensionId } from '@inmine/utils/dimension/raw-dimension-id';

import { InMineAbstractEventPipe } from '../event-pipe';

type ExplosionImpactedBlockFilterOptions = {
  typeId: Identifier;
};

abstract class BaseExplosionEventPipe<
  E extends ExplosionAfterEvent,
> extends InMineAbstractEventPipe<E> {
  matchesDimension(e: E, dimensionId: DimensionTypes | string): boolean {
    return rawDimensionId(e.dimension) === dimensionId;
  }

  /**
   * @returns True if entity exists and matches input type id.
   */
  sourceMatchesId(e: E, typeId: Identifier): boolean {
    return e.source ? e.source.typeId === typeId : false;
  }

  filterImpactedBlocks(
    e: E,
    options: ExplosionImpactedBlockFilterOptions,
  ): Block[] {
    return e
      .getImpactedBlocks()
      .filter((b) => b.isValid() && b.permutation.matches(options.typeId));
  }
}

export abstract class ExplosionAfterEventPipe extends BaseExplosionEventPipe<ExplosionAfterEvent> {}

export abstract class ExplosionBeforeEventPipe extends BaseExplosionEventPipe<ExplosionBeforeEvent> {}
