import { PlayerJoinAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class PlayerJoinAfterListener extends InMineAbstractEventListener<PlayerJoinAfterEvent> {
  constructor(pipe: InMineEventPipe<PlayerJoinAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.playerJoin,
    });
  }
}
