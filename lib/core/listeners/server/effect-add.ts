import { ExplosionAfterEvent, ExplosionBeforeEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { beforeEvents } from '@inmine/common/constants/events/before-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class ExplosionAfterListener extends InMineAbstractEventListener<ExplosionAfterEvent> {
  constructor(pipe: InMineEventPipe<ExplosionAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.explosion,
    });
  }
}

export class ExplosionBeforeListener extends InMineAbstractEventListener<ExplosionBeforeEvent> {
  constructor(pipe: InMineEventPipe<ExplosionBeforeEvent>) {
    super({
      pipe: pipe,
      signal: beforeEvents.explosion,
    });
  }
}
