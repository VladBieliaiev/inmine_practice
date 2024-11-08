import { EntityDataDrivenTriggerEventOptions } from '@minecraft/server';

import { EntityEventTriggerEventContext, Identifier } from '@inmine/common';
import { afterEvents } from '@inmine/common/constants/events/after-events';

import { ArtifexEntityEventTriggerAfterEventPipe } from '../../pipes/entity/event-trigger.pipe';
import { ArtifexEventPipesStorage } from '../../pipes/event-pipes.storage';
import { ArtifexEntityEventsAfterListenerInterface } from '../interfaces';
import { ArtifexSingleEventListener } from '../single-event-listener';
import {
  ArtifexEntityEventsListenerRoute,
  ArtifexEntityEventsListenerRouteWithCustomPipe,
} from '../types';
import { ArtifexEntityEventsStorage } from '../types/entity/storage';

export class ArtifexEntityEventsTriggerAfterListener
  extends ArtifexSingleEventListener<EntityEventTriggerEventContext>
  implements ArtifexEntityEventsAfterListenerInterface
{
  protected readonly storage: ArtifexEntityEventsStorage = new Map();
  protected entityIds: Identifier[];

  constructor(entityId: Identifier | Identifier[]) {
    if (!Array.isArray(entityId)) {
      entityId = [entityId];
    }

    super(afterEvents.dataDrivenEntityTrigger, {});
    this.entityIds = entityId;
    this.filter = this.createFilter();
  }

  add<EventId extends Identifier>(
    route: ArtifexEntityEventsListenerRoute<EventId>,
  ): ArtifexEntityEventsAfterListenerInterface {
    this.addManually({
      eventId: route.eventId,
      pipe: ArtifexEventPipesStorage.getOrCreate(route.pipe),
    });

    return this;
  }

  addManually<
    EventId extends Identifier,
    CustomPipe extends ArtifexEntityEventTriggerAfterEventPipe,
  >(
    route: ArtifexEntityEventsListenerRouteWithCustomPipe<EventId, CustomPipe>,
  ) {
    this.storage.set(route.eventId, route.pipe);

    this.filter = this.createFilter();

    return this;
  }

  createFilter(): EntityDataDrivenTriggerEventOptions {
    const eventTypes = [...this.storage.keys()];

    return eventTypes.length
      ? {
          entityTypes: this.entityIds,
          eventTypes,
        }
      : {
          entityTypes: this.entityIds,
        };
  }

  protected call() {
    return this.signal.subscribe((e) => {
      this.storage.get(e.eventId as Identifier)?.execute(e);
    }, this.filter);
  }
}
