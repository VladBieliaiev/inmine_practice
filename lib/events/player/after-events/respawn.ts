import { PlayerSpawnAfterListener } from '@inmine/core/listeners/player/spawn';
import { PlayerSpawnAfterEventPipe } from '@inmine/core/pipes/event/player/spawn.pipe';

export function respawn(pipe: PlayerSpawnAfterEventPipe) {
  return new PlayerSpawnAfterListener(pipe);
}
