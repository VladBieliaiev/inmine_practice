import { EffectAddAfterEvent, EffectAddBeforeEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { beforeEvents } from '@inmine/common/constants/events/before-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class EntityEffectAddAfterListener extends InMineAbstractEventListener<EffectAddAfterEvent> {
  constructor(pipe: InMineEventPipe<EffectAddAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.effectAdd,
    });
  }
}

export class EntityEffectAddBeforeListener extends InMineAbstractEventListener<EffectAddBeforeEvent> {
  constructor(pipe: InMineEventPipe<EffectAddBeforeEvent>) {
    super({
      pipe: pipe,
      signal: beforeEvents.effectAdd,
    });
  }
}
