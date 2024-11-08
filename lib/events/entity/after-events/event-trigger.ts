import { EntitiesEventTriggerRoute } from '@inmine/common/types/events/entity';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';
import { EntitiesEventTriggerAfterListener } from '@inmine/core/listeners/entity/event-trigger';
import { EventListenersStorage } from '@inmine/core/listeners/storage';

export function eventTrigger<
  EventId extends Identifier,
  EntityIds extends Identifier,
>(route?: EntitiesEventTriggerRoute<EventId, EntityIds>) {
  return (
    EventListenersStorage.getByName(EntitiesEventTriggerAfterListener) ||
    EventListenersStorage.add(new EntitiesEventTriggerAfterListener(route))
  );
}
