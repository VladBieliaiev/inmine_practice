import { EntityLoadAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class EntityLoadAfterListener extends InMineAbstractEventListener<EntityLoadAfterEvent> {
  constructor(pipe: InMineEventPipe<EntityLoadAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.entityLoad,
    });
  }
}
