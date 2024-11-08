import { ArtifexEventListenerInterface } from '@inmine/artifex/common';
import { ArtifexEntityEventsListenerRoute } from '@inmine/artifex/events/listeners/types/entity/events-trigger-route';
import { Identifier } from '@inmine/common';

export interface ArtifexEntityEventsAfterListenerInterface
  extends ArtifexEventListenerInterface {
  add(
    route: ArtifexEntityEventsListenerRoute<Identifier>,
  ): ArtifexEntityEventsAfterListenerInterface;
}
