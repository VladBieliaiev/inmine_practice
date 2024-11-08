import { PressurePlatePushAfterListener } from '@inmine/core/listeners/server/preasure-plate-action';
import { PressurePlatePushAfterEventPipe } from '@inmine/core/pipes/event/server/pressure-plate-push.pipe';

export function pressurePlatePush(pipe: PressurePlatePushAfterEventPipe) {
  return new PressurePlatePushAfterListener(pipe);
}
