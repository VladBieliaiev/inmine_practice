import { PlayerSpawnAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class PlayerSpawnAfterEventPipe extends InMineAbstractEventPipe<PlayerSpawnAfterEvent> {}
