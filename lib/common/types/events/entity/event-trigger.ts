import { ArtifexEntityEventTriggerAfterEventPipe } from '@inmine/artifex/events/pipes/entity/event-trigger.pipe';

import { CreatableClass } from '../../base';
import { Identifier } from '../../../../artifex/common/types/name';

export type EntitiesEventTriggerRoute<
  EventId extends Identifier,
  EntityId extends Identifier,
> = {
  pipe: CreatableClass<ArtifexEntityEventTriggerAfterEventPipe>;
  eventId: EventId;
  entityId: EntityId | EntityId[];
};
