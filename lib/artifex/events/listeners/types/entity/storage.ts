import { ArtifexEntityEventTriggerAfterEventPipe } from '@inmine/artifex/events/pipes/entity/event-trigger.pipe';
import { Identifier } from '@inmine/common';

export type ArtifexEntityEventsStorage = Map<
  Identifier,
  ArtifexEntityEventTriggerAfterEventPipe
>;
