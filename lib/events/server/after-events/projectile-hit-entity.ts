import { ProjectileHitEntityAfterListener } from '@inmine/core/listeners/entity/projectile-hit';
import { ProjectileHitEntityAfterEventPipe } from '@inmine/core/pipes/event/server/projectile-hit-entity.pipe';

export function projectileHitEntity(pipe: ProjectileHitEntityAfterEventPipe) {
  return new ProjectileHitEntityAfterListener(pipe);
}
