import { WorldInitializeAfterListener } from '@inmine/core/listeners/server/world-initialize';
import { WorldInitializeAfterEventPipe } from '@inmine/core/pipes/event/server/world-initialize.pipe';

export function worldInitialize(pipe: WorldInitializeAfterEventPipe) {
  return new WorldInitializeAfterListener(pipe);
}
