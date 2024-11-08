import { EntityHurtAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class EntityHurtAfterEventPipe extends InMineAbstractEventPipe<EntityHurtAfterEvent> {}
