import { TripWireTripAfterListener } from '@inmine/core/listeners/server/tripwire-trip';
import { TripWireTripAfterEventPipe } from '@inmine/core/pipes/event/server/trip-wire-trip.pipe';

export function tripWireTrip(pipe: TripWireTripAfterEventPipe) {
  return new TripWireTripAfterListener(pipe);
}
