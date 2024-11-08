import {
  PlayerBreakBlockAfterEvent,
  PlayerBreakBlockBeforeEvent,
} from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class PlayerBreakBlockAfterEventPipe extends InMineAbstractEventPipe<PlayerBreakBlockAfterEvent> {}

export abstract class PlayerBreakBlockBeforeEventPipe extends InMineAbstractEventPipe<PlayerBreakBlockBeforeEvent> {}
