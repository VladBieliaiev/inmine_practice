import {
  EntityEventOptions,
  EntityHealthChangedAfterEvent,
} from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class EntityHealthChangedAfterListener extends InMineAbstractEventListener<EntityHealthChangedAfterEvent> {
  constructor(
    pipe: InMineEventPipe<EntityHealthChangedAfterEvent>,
    filter?: EntityEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: afterEvents.entityHealthChanged,
      filter,
    });
  }
}
