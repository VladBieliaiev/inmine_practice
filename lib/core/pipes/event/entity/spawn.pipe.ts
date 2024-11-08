import { EntitySpawnAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class EntitySpawnAfterEventPipe extends InMineAbstractEventPipe<EntitySpawnAfterEvent> {}
