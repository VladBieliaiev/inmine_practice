import { ExplosionBeforeListener } from '@inmine/core/listeners/server/effect-add';
import { ExplosionBeforeEventPipe } from '@inmine/core/pipes/event/server/explosion.pipe';

export function explosion(pipe: ExplosionBeforeEventPipe) {
  return new ExplosionBeforeListener(pipe);
}
