import { SystemTickEventPipe } from '@inmine/core/pipes/event/system/tick.pipe';

import { SystemTickAfterListener } from '../../../core/listeners/system/tick';

export function tick(pipe: SystemTickEventPipe, every: number = 10) {
  return new SystemTickAfterListener(pipe, every);
}
