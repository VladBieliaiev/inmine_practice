import { ArtifexEntityEventsTriggerAfterListener } from '@inmine/artifex/events/listeners/entity/events-trigger';
import { Identifier } from '@inmine/common';

export function entityEventsTrigger<EntityId extends Identifier | Identifier[]>(
  entityId: EntityId,
) {
  return new ArtifexEntityEventsTriggerAfterListener(entityId);
}
