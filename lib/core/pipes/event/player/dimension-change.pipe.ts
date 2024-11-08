import { PlayerDimensionChangeAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class PlayerDimensionChangeAfterEventPipe extends InMineAbstractEventPipe<PlayerDimensionChangeAfterEvent> {}
