import { DataDrivenEntityTriggerAfterEvent } from '@minecraft/server';

import { ArtifexEntityEventTriggerAfterEventPipe } from '@inmine/artifex/events/pipes/entity/event-trigger.pipe';
import { ArtifexEventPipesStorage } from '@inmine/artifex/events/pipes/event-pipes.storage';
import { afterEvents } from '@inmine/common/constants/events/after-events';
import { EntityEventTriggerEventListenerInterface as EntitiesEventTriggerEventListenerInterface } from '@inmine/common/interfaces/events/entity/event-trigger';
import { EntitiesEventTriggerRoute } from '@inmine/common/types/events/entity/event-trigger';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';

export class EntitiesEventTriggerAfterListener
  implements EntitiesEventTriggerEventListenerInterface
{
  constructor(
    router?: EntitiesEventTriggerRoute<Identifier, Identifier>,
    protected readonly _signal = afterEvents.dataDrivenEntityTrigger,
    protected readonly _pipesCache: Map<
      string,
      ArtifexEntityEventTriggerAfterEventPipe
    > = new Map(),
    protected readonly _entityIdsUsedByEvent: Map<
      Identifier,
      Identifier[]
    > = new Map(),
    protected readonly _eventRefRecord: Map<
      Identifier,
      (arg: DataDrivenEntityTriggerAfterEvent) => void
    > = new Map(),
  ) {
    if (router) {
      this.add(router);
    }
  }

  add<EventId extends Identifier, EntityId extends Identifier>(
    route: EntitiesEventTriggerRoute<EventId, EntityId>,
  ) {
    const pipeInstance = ArtifexEventPipesStorage.getOrCreate(route.pipe);

    if (!Array.isArray(route.entityId)) {
      route.entityId = [route.entityId];
    }

    let usedEntityIds: Identifier[] = [];
    if (this._entityIdsUsedByEvent.has(route.eventId)) {
      usedEntityIds = this._entityIdsUsedByEvent.get(route.eventId)!;
    }

    route.entityId.forEach((entityId) => {
      if (!usedEntityIds.includes(entityId)) {
        usedEntityIds.push(entityId);
      }
      this._pipesCache.set(`${route.eventId}_${entityId}`, pipeInstance);
    });

    this._entityIdsUsedByEvent.set(route.eventId, usedEntityIds);

    return this;
  }

  public listen(): void {
    this.call();
  }
  public mute(): void {
    this._eventRefRecord.forEach((ref) => {
      this._signal.unsubscribe(ref);
    });
  }

  /**
   * Call the event trigger. If no event id is provided, all the event triggers will be called.
   * @param eventId The event id list.
   */
  protected call(eventId?: Identifier[]) {
    if (this._eventRefRecord.size) {
      return;
    }
    if (!eventId) {
      eventId = Array.from(this._entityIdsUsedByEvent.keys());
    }

    eventId.forEach((eventId) => {
      this._eventRefRecord.set(
        eventId,
        this.createSignal(eventId, this._entityIdsUsedByEvent.get(eventId)),
      );
    });
  }
  protected createSignal(eventId: Identifier, entityIds: Identifier[] = []) {
    return this._signal.subscribe(
      (e) => this._pipesCache.get(`${eventId}_${e.entity.typeId}`)!.execute(e),
      entityIds.length
        ? {
            entityTypes: entityIds,
            eventTypes: [eventId],
          }
        : {
            eventTypes: [eventId],
          },
    );
  }
}
