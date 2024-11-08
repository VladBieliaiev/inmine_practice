import { EntityDieAfterEvent, EntityEventOptions } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class EntityDieAfterListener extends InMineAbstractEventListener<EntityDieAfterEvent> {
  constructor(
    pipe: InMineEventPipe<EntityDieAfterEvent>,
    filter?: EntityEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: afterEvents.entityDie,
      filter,
    });
  }
}
