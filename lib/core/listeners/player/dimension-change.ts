import { PlayerDimensionChangeAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class PlayerDimensionChangeAfterListener extends InMineAbstractEventListener<PlayerDimensionChangeAfterEvent> {
  constructor(pipe: InMineEventPipe<PlayerDimensionChangeAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.playerDimensionChange,
    });
  }
}
