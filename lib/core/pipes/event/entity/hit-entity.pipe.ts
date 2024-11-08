import { EntityHitEntityAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class EntityHitEntityAfterEventPipe extends InMineAbstractEventPipe<EntityHitEntityAfterEvent> {}
