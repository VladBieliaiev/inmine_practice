import { EntityEventOptions, EntityHurtAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class EntityHurtAfterListener extends InMineAbstractEventListener<EntityHurtAfterEvent> {
  constructor(
    pipe: InMineEventPipe<EntityHurtAfterEvent>,
    filter?: EntityEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: afterEvents.entityHurt,
      filter,
    });
  }
}
