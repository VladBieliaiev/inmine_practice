import { TripWireTripAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export class TripWireTripAfterListener extends InMineAbstractEventListener<TripWireTripAfterEvent> {
  constructor(pipe: InMineEventPipe<TripWireTripAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.tripWireTrip,
    });
  }
}
