import { EntitySpawnAfterListener } from '@inmine/core/listeners/entity/spawn';
import { EntitySpawnAfterEventPipe } from '@inmine/core/pipes/event/entity/spawn.pipe';

export function spawn(pipe: EntitySpawnAfterEventPipe) {
  return new EntitySpawnAfterListener(pipe);
}
