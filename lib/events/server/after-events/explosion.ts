import { ExplosionAfterListener } from '@inmine/core/listeners/server/effect-add';
import { ExplosionAfterEventPipe } from '@inmine/core/pipes/event/server/explosion.pipe';

export function explosion(pipe: ExplosionAfterEventPipe) {
  return new ExplosionAfterListener(pipe);
}
