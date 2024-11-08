import { EntityEventOptions } from '@minecraft/server';

import { EntityHitEntityAfterListener } from '@inmine/core/listeners/entity/hit';
import { EntityHitEntityAfterEventPipe } from '@inmine/core/pipes/event/entity/hit-entity.pipe';

export function hitEntity(
  pipe: EntityHitEntityAfterEventPipe,
  filter?: EntityEventOptions,
) {
  return new EntityHitEntityAfterListener(pipe, filter);
}

export function damagesEntity(
  pipe: EntityHitEntityAfterEventPipe,
  filter?: EntityEventOptions,
) {
  return new EntityHitEntityAfterListener(pipe, filter);
}
