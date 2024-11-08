import {
  BlockEventOptions,
  PlayerBreakBlockAfterEvent,
  PlayerBreakBlockBeforeEvent,
} from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { beforeEvents } from '@inmine/common/constants/events/before-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class PlayerBreakBlockAfterListener extends InMineAbstractEventListener<PlayerBreakBlockAfterEvent> {
  constructor(
    pipe: InMineEventPipe<PlayerBreakBlockAfterEvent>,
    filter?: BlockEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: afterEvents.playerBreakBlock,
      filter,
    });
  }
}

export class PlayerBreakBlockBeforeListener extends InMineAbstractEventListener<PlayerBreakBlockBeforeEvent> {
  constructor(
    pipe: InMineEventPipe<PlayerBreakBlockBeforeEvent>,
    filter?: BlockEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: beforeEvents.playerBreakBlock,
      filter,
    });
  }
}
