import { PlayerDimensionChangeAfterListener } from '@inmine/core/listeners/player/dimension-change';
import { PlayerDimensionChangeAfterEventPipe } from '@inmine/core/pipes/event/player/dimension-change.pipe';

export function dimensionChange(pipe: PlayerDimensionChangeAfterEventPipe) {
  return new PlayerDimensionChangeAfterListener(pipe);
}
