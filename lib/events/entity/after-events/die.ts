import { EntityEventOptions } from '@minecraft/server';

import { EntityDieAfterListener } from '@inmine/core/listeners/entity/die';
import { EntityDieAfterEventPipe } from '@inmine/core/pipes/event/entity/die.pipe';

export function die(
  pipe: EntityDieAfterEventPipe,
  filter?: EntityEventOptions,
) {
  return new EntityDieAfterListener(pipe, filter);
}
