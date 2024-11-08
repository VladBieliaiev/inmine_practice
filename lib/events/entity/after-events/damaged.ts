import { EntityEventOptions } from '@minecraft/server';

import { EntityHurtAfterListener } from '@inmine/core/listeners/entity/hurt';
import { EntityHurtAfterEventPipe } from '@inmine/core/pipes/event/entity/hurt.pipe';

export function hurt(
  pipe: EntityHurtAfterEventPipe,
  filter?: EntityEventOptions,
) {
  return new EntityHurtAfterListener(pipe, filter);
}

export function damaged(
  pipe: EntityHurtAfterEventPipe,
  filter?: EntityEventOptions,
) {
  return new EntityHurtAfterListener(pipe, filter);
}
