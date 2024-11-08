import {
  PressurePlatePopAfterEvent,
  PressurePlatePushAfterEvent,
} from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class PressurePlatePopAfterListener extends InMineAbstractEventListener<PressurePlatePopAfterEvent> {
  constructor(pipe: InMineEventPipe<PressurePlatePopAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.pressurePlatePop,
    });
  }
}

export class PressurePlatePushAfterListener extends InMineAbstractEventListener<PressurePlatePushAfterEvent> {
  constructor(pipe: InMineEventPipe<PressurePlatePushAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.pressurePlatePush,
    });
  }
}
