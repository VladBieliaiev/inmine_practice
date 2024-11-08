import { EntityHitBlockAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class EntityHitBlockAfterEventPipe extends InMineAbstractEventPipe<EntityHitBlockAfterEvent> {}
