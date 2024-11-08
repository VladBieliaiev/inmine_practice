import { DefaultEntitiesEventTriggerRoute } from '@inmine/common/types/events/entity/default-event-route';

import { InMineEventListenerInterface } from '../event-listener';

export interface EntityEventTriggerEventListenerInterface
  extends InMineEventListenerInterface {
  add(
    route: DefaultEntitiesEventTriggerRoute,
  ): EntityEventTriggerEventListenerInterface;
}
