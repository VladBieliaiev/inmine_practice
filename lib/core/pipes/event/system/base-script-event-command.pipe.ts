import { Entity, Player } from '@minecraft/server';

import { Identifier } from '@inmine/common';
import { ScriptEventContext } from '@inmine/common/types/events/core';
import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class BaseScriptEventCommandAbstractPipe<
  T extends ScriptEventContext,
> extends InMineAbstractEventPipe<T> {
  hasSource(e: T): boolean {
    return !!e.sourceEntity;
  }

  hasBlock(e: T): boolean {
    return !!e.sourceBlock;
  }

  parseEntity(e: T, typeId: Identifier): Entity | undefined {
    return this.hasSource(e) && e.sourceEntity!.typeId === typeId
      ? e.sourceEntity
      : undefined;
  }

  parsePlayer(e: T): Player | undefined {
    return this.parseEntity(e, 'minecraft:player') as Player | undefined;
  }
}
