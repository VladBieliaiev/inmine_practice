import {
  EntityEventOptions,
  EntityHitBlockAfterEvent,
  EntityHitEntityAfterEvent,
} from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class EntityHitEntityAfterListener extends InMineAbstractEventListener<EntityHitEntityAfterEvent> {
  constructor(
    pipe: InMineEventPipe<EntityHitEntityAfterEvent>,
    filter?: EntityEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: afterEvents.entityHitEntity,
      filter,
    });
  }
}

export class EntityHitBlockAfterListener extends InMineAbstractEventListener<EntityHitBlockAfterEvent> {
  constructor(
    pipe: InMineEventPipe<EntityHitBlockAfterEvent>,
    filter?: EntityEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: afterEvents.entityHitBlock,
      filter,
    });
  }
}
