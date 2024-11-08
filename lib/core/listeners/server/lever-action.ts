import { LeverActionAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class LeverActionAfterListener extends InMineAbstractEventListener<LeverActionAfterEvent> {
  constructor(pipe: InMineEventPipe<LeverActionAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.leverAction,
    });
  }
}
