import { ArtifexEventListenerInterface } from '@inmine/artifex/common';
import { DefaultItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/default-event-route';

export interface ArtifexBaseItemUseEventListenerInterface
  extends ArtifexEventListenerInterface {
  add(
    route: DefaultItemUseEventRoute,
  ): ArtifexBaseItemUseEventListenerInterface;
}
