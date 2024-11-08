import {
  EntityRemoveAfterEvent,
  EntityRemoveBeforeEvent,
} from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class EntityRemoveAfterEventPipe extends InMineAbstractEventPipe<EntityRemoveAfterEvent> {}

export abstract class EntityRemoveBeforeEventPipe extends InMineAbstractEventPipe<EntityRemoveBeforeEvent> {}
