import { EntityEventOptions } from '@minecraft/server';

import { EntityRemoveAfterListener } from '@inmine/core/listeners/entity/remove';
import { EntityRemoveAfterEventPipe } from '@inmine/core/pipes/event/entity/removed.pipe';

export function removed(
  pipe: EntityRemoveAfterEventPipe,
  filter?: EntityEventOptions,
) {
  return new EntityRemoveAfterListener(pipe, filter);
}
