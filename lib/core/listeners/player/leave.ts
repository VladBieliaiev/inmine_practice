import {
  PlayerLeaveAfterEvent,
  PlayerLeaveBeforeEvent,
} from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { beforeEvents } from '@inmine/common/constants/events/before-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class PlayerLeaveAfterListener extends InMineAbstractEventListener<PlayerLeaveAfterEvent> {
  constructor(pipe: InMineEventPipe<PlayerLeaveAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.playerLeave,
    });
  }
}

export class PlayerLeaveBeforeListener extends InMineAbstractEventListener<PlayerLeaveBeforeEvent> {
  constructor(pipe: InMineEventPipe<PlayerLeaveBeforeEvent>) {
    super({
      pipe: pipe,
      signal: beforeEvents.playerLeave,
    });
  }
}
