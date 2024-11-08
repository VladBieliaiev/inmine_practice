import { PlayerPlaceBlockAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class PlayerPlaceBlockAfterEventPipe extends InMineAbstractEventPipe<PlayerPlaceBlockAfterEvent> {}
