import { ButtonPushAfterListener } from '@inmine/core/listeners/server/button-push';
import { ButtonPushAfterEventPipe } from '@inmine/core/pipes/event/server/button-push.pipe';

export function buttonPush(pipe: ButtonPushAfterEventPipe) {
  return new ButtonPushAfterListener(pipe);
}
