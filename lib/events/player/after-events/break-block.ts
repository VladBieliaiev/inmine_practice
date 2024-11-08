import { BlockEventOptions } from '@minecraft/server';

import { PlayerBreakBlockAfterListener } from '@inmine/core/listeners/player/break-block';
import { PlayerBreakBlockAfterEventPipe } from '@inmine/core/pipes/event/player/break-block.pipe';

export function breakBlock(
  pipe: PlayerBreakBlockAfterEventPipe,
  filter?: BlockEventOptions,
) {
  return new PlayerBreakBlockAfterListener(pipe, filter);
}
