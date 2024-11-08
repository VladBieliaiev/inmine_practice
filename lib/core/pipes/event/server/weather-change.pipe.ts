import { WeatherChangeAfterEvent } from '@minecraft/server';

import { InMineAbstractEventPipe } from '../event-pipe';

export abstract class WeatherChangeAfterEventPipe extends InMineAbstractEventPipe<WeatherChangeAfterEvent> {}
