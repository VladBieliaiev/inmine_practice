import { PistonActivateAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class PistonActionAfterListener extends InMineAbstractEventListener<PistonActivateAfterEvent> {
  constructor(pipe: InMineEventPipe<PistonActivateAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.pistonActivate,
    });
  }
}
