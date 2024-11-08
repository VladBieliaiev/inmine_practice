import {
  EntityEventOptions,
  ProjectileHitBlockAfterEvent,
  ProjectileHitEntityAfterEvent,
} from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class ProjectileHitEntityAfterListener extends InMineAbstractEventListener<ProjectileHitEntityAfterEvent> {
  constructor(
    pipe: InMineEventPipe<ProjectileHitEntityAfterEvent>,
    filter?: EntityEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: afterEvents.projectileHitEntity,
      filter,
    });
  }
}

export class ProjectileHitBlockAfterListener extends InMineAbstractEventListener<ProjectileHitBlockAfterEvent> {
  constructor(
    pipe: InMineEventPipe<ProjectileHitBlockAfterEvent>,
    filter?: EntityEventOptions,
  ) {
    super({
      pipe: pipe,
      signal: afterEvents.projectileHitBlock,
      filter,
    });
  }
}
