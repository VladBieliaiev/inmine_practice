import { WeatherChangeAfterListener } from '@inmine/core/listeners/server/weather-change';
import { WeatherChangeAfterEventPipe } from '@inmine/core/pipes/event/server/weather-change.pipe';

export function weatherChange(pipe: WeatherChangeAfterEventPipe) {
  return new WeatherChangeAfterListener(pipe);
}
