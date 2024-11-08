import { PlayerFirstJoinAfterListener } from '@inmine/core/listeners/player/spawn';
import { PlayerSpawnAfterEventPipe } from '@inmine/core/pipes/event/player/spawn.pipe';

export function firstJoin(pipe: PlayerSpawnAfterEventPipe) {
  return new PlayerFirstJoinAfterListener(pipe);
}
