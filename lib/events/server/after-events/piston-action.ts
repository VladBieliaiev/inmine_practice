import { PistonActionAfterListener } from '@inmine/core/listeners/server/piston-action';
import { PistonActivateAfterEventPipe } from '@inmine/core/pipes/event/server/piston-action.pipe';

export function pistonAction(pipe: PistonActivateAfterEventPipe) {
  return new PistonActionAfterListener(pipe);
}
