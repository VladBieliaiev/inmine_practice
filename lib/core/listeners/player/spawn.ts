import { PlayerSpawnAfterEvent } from '@minecraft/server';

import { EventRef } from '@inmine/common';
import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class PlayerFirstJoinAfterListener extends InMineAbstractEventListener<PlayerSpawnAfterEvent> {
  constructor(pipe: InMineEventPipe<PlayerSpawnAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.playerSpawn,
    });
  }

  call(): EventRef<PlayerSpawnAfterEvent> {
    return this.signal.subscribe((e) => {
      if (e.initialSpawn) {
        this.pipe.execute(e);
      }
    });
  }
}

export class PlayerSpawnAfterListener extends InMineAbstractEventListener<PlayerSpawnAfterEvent> {
  constructor(pipe: InMineEventPipe<PlayerSpawnAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.playerSpawn,
    });
  }
}
