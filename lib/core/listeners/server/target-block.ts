import { TargetBlockHitAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class TargetBlockHitAfterListener extends InMineAbstractEventListener<TargetBlockHitAfterEvent> {
  constructor(pipe: InMineEventPipe<TargetBlockHitAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.targetBlockHit,
    });
  }
}
