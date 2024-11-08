import { BlockEventOptions } from '@minecraft/server';

import { PlayerBreakBlockBeforeListener } from '@inmine/core/listeners/player/break-block';
import { PlayerBreakBlockBeforeEventPipe } from '@inmine/core/pipes/event/player/break-block.pipe';

export function breakBlock(
  pipe: PlayerBreakBlockBeforeEventPipe,
  filter?: BlockEventOptions,
) {
  return new PlayerBreakBlockBeforeListener(pipe, filter);
}
