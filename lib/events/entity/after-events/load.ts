import { EntityLoadAfterListener } from '@inmine/core/listeners/entity/load';
import { EntityLoadAfterEventPipe } from '@inmine/core/pipes/event/entity/load.pipe';

export function load(pipe: EntityLoadAfterEventPipe) {
  return new EntityLoadAfterListener(pipe);
}
