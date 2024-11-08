import { WeatherChangeAfterEvent } from '@minecraft/server';

import { afterEvents } from '@inmine/common/constants/events/after-events';
import { InMineEventPipe } from '@inmine/common/interfaces/events';

import { InMineAbstractEventListener } from '../base-event-listener';

export class WeatherChangeAfterListener extends InMineAbstractEventListener<WeatherChangeAfterEvent> {
  constructor(pipe: InMineEventPipe<WeatherChangeAfterEvent>) {
    super({
      pipe: pipe,
      signal: afterEvents.weatherChange,
    });
  }
}
