import { EntityRemoveBeforeListener } from '@inmine/core/listeners/entity/remove';
import { EntityRemoveBeforeEventPipe } from '@inmine/core/pipes/event/entity/removed.pipe';

export function removed(pipe: EntityRemoveBeforeEventPipe) {
  return new EntityRemoveBeforeListener(pipe);
}
