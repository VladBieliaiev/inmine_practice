import { EntityEventOptions } from '@minecraft/server';

import { EntityHitBlockAfterListener } from '@inmine/core/listeners/entity/hit';
import { EntityHitBlockAfterEventPipe } from '@inmine/core/pipes/event/entity/hit-block.pipe';

export function hitBlock(
  pipe: EntityHitBlockAfterEventPipe,
  filter?: EntityEventOptions,
) {
  return new EntityHitBlockAfterListener(pipe, filter);
}
