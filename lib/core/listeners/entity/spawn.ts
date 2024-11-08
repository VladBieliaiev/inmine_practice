import { EntitySpawnAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class EntitySpawnAfterListener extends InMineAbstractEventListener<EntitySpawnAfterEvent> {
  constructor(pipe: InMineEventPipe<EntitySpawnAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.entitySpawn,
    });
  }
}
