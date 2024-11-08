import { ProjectileHitBlockAfterListener } from '@inmine/core/listeners/entity/projectile-hit';
import { ProjectileHitBlockAfterEventPipe } from '@inmine/core/pipes/event/server/projectile-hit-block.pipe';

export function projectileHitBlock(pipe: ProjectileHitBlockAfterEventPipe) {
  return new ProjectileHitBlockAfterListener(pipe);
}
