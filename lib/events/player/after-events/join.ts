import { PlayerJoinAfterListener } from '@inmine/core/listeners/player/join';
import { PlayerJoinAfterEventPipe } from '@inmine/core/pipes/event/player/join.pipe';

export function join(pipe: PlayerJoinAfterEventPipe) {
  return new PlayerJoinAfterListener(pipe);
}
