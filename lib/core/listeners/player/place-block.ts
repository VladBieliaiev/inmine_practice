import {
  BlockEventOptions,
  PlayerPlaceBlockAfterEvent,
} from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class PlayerPlaceBlockAfterListener extends InMineAbstractEventListener<PlayerPlaceBlockAfterEvent> {
  constructor(
    pipe: InMineEventPipe<PlayerPlaceBlockAfterEvent>,
    filter?: BlockEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: afterEvents.playerPlaceBlock,
      filter,
    });
  }
}
