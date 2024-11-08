import { EntityEventTriggerEventModifiedComponentGroups } from '@inmine/common/types/events/entity';
import { EntityEventTriggerEventContext } from '@inmine/common/types/events/entity/event-trigget-event-context';

import { ArtifexBaseEventPipe } from '../base-event.pipe';

export abstract class ArtifexEntityEventTriggerAfterEventPipe extends ArtifexBaseEventPipe<EntityEventTriggerEventContext> {
  protected getModifiedComponentGroups(
    e: EntityEventTriggerEventContext,
  ): EntityEventTriggerEventModifiedComponentGroups | undefined {
    const added: string[] = [];
    const removed: string[] = [];

    e.getModifiers().forEach((d) => {
      if (d.addedComponentGroups.length) {
        d.addedComponentGroups.forEach((c) => {
          if (!added.includes(c)) {
            added.push(c);
          }
        });
      }

      if (d.removedComponentGroups.length) {
        d.removedComponentGroups.forEach((c) => {
          if (!removed.includes(c)) {
            removed.push(c);
          }
        });
      }
    });

    return added.length && removed.length
      ? { added, removed }
      : added.length
        ? { added }
        : removed.length
          ? { removed }
          : undefined;
  }
}
