import { BlockEventOptions } from '@minecraft/server';

import { PlayerPlaceBlockAfterListener } from '@inmine/core/listeners/player/place-block';
import { PlayerPlaceBlockAfterEventPipe } from '@inmine/core/pipes/event/player/place-block.pipe';

export function placeBlock(
  pipe: PlayerPlaceBlockAfterEventPipe,
  filter?: BlockEventOptions,
) {
  return new PlayerPlaceBlockAfterListener(pipe, filter);
}
