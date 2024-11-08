import { ArtifexEntityEventTriggerAfterEventPipe } from '@inmine/artifex/events/pipes/entity/event-trigger.pipe';
import { CreatableClass, Identifier } from '@inmine/common';

export type ArtifexEntityEventsListenerRoute<EventId extends Identifier> = {
  pipe: CreatableClass<ArtifexEntityEventTriggerAfterEventPipe>;
  eventId: EventId;
};

export type ArtifexEntityEventsListenerRouteWithCustomPipe<
  EventId extends Identifier,
  Pipe extends ArtifexEntityEventTriggerAfterEventPipe,
> = {
  pipe: Pipe;
  eventId: EventId;
};
