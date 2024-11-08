import { EntityEventOptions } from '@minecraft/server';

import { EntityHealthChangedAfterListener } from '@inmine/core/listeners/entity/health-changed';
import { EntityHealthChangedAfterEventPipe } from '@inmine/core/pipes/event/entity/health-changed.pipe';

export function healthChanged(
  pipe: EntityHealthChangedAfterEventPipe,
  filter?: EntityEventOptions,
) {
  return new EntityHealthChangedAfterListener(pipe, filter);
}
