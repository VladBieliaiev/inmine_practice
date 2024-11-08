import { EntityLoadAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class EntityLoadAfterEventPipe extends InMineAbstractEventPipe<EntityLoadAfterEvent> {}
