import {
  EntityEventOptions,
  EntityRemoveAfterEvent,
  EntityRemoveBeforeEvent,
} from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { beforeEvents } from '@inmine/common/constants/events/before-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class EntityRemoveAfterListener extends InMineAbstractEventListener<EntityRemoveAfterEvent> {
  constructor(
    pipe: InMineEventPipe<EntityRemoveAfterEvent>,
    filter?: EntityEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: afterEvents.entityRemove,
      filter,
    });
  }
}

export class EntityRemoveBeforeListener extends InMineAbstractEventListener<EntityRemoveBeforeEvent> {
  constructor(pipe: InMineEventPipe<EntityRemoveBeforeEvent>) {
    super({
      pipe: pipe,
      signal: beforeEvents.entityRemove,
    });
  }
}
