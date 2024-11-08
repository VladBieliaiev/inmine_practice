import { EntityDieAfterEvent, Player } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class EntityDieAfterEventPipe extends InMineAbstractEventPipe<EntityDieAfterEvent> {
  protected getPlayer(e: EntityDieAfterEvent): Player | undefined {
    return e.deadEntity.typeId === 'minecraft:player'
      ? (e.deadEntity as Player)
      : undefined;
  }
}
