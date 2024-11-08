import { LeverActionAfterListener } from '@inmine/core/listeners/server/lever-action';
import { LeverActionAfterEventPipe } from '@inmine/core/pipes/event/server/lever-action.pipe';

export function leverAction(pipe: LeverActionAfterEventPipe) {
  return new LeverActionAfterListener(pipe);
}
