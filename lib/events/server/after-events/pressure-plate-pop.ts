import { PressurePlatePopAfterListener } from '@inmine/core/listeners/server/preasure-plate-action';
import { PressurePlatePopAfterEventPipe } from '@inmine/core/pipes/event/server/pressure-plate-pop.pipe';

export function pressurePlatePop(pipe: PressurePlatePopAfterEventPipe) {
  return new PressurePlatePopAfterListener(pipe);
}
