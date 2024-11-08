import { ButtonPushAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class ButtonPushAfterListener extends InMineAbstractEventListener<ButtonPushAfterEvent> {
  constructor(pipe: InMineEventPipe<ButtonPushAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.buttonPush,
    });
  }
}
