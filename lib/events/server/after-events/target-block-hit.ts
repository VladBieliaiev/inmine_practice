import { TargetBlockHitAfterListener } from '@inmine/core/listeners/server/target-block';
import { TargetBlockHitAfterEventPipe } from '@inmine/core/pipes/event/server/target-block-hit.pipe';

export function targetBlockHit(pipe: TargetBlockHitAfterEventPipe) {
  return new TargetBlockHitAfterListener(pipe);
}
