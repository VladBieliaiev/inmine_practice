import { EntityHealthChangedAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class EntityHealthChangedAfterEventPipe extends InMineAbstractEventPipe<EntityHealthChangedAfterEvent> {}
