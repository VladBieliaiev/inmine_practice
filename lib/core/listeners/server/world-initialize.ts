import { WorldInitializeAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';

import { InMineAbstractEventListener } from '../base-event-listener';

export class WorldInitializeAfterListener extends InMineAbstractEventListener<WorldInitializeAfterEvent> {
  constructor(pipe: InMineEventPipe<WorldInitializeAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.worldInitialize,
    });
  }
}
