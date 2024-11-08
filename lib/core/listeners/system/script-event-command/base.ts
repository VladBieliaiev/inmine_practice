import { ScriptEventCommandMessageAfterEvent, system } from '@minecraft/server';

import { EventRef } from '@inmine/common/types/events';
import {
  ScriptEventCommandListenOptions,
  ScriptEventCommandWithParamsListenOptions,
} from '@inmine/common/types/events/core';
import { ScriptEventContext } from '@inmine/common/types/events/core/script-event-command/context';
import { InMineAbstractEventListener } from '@inmine/core/listeners/base-event-listener';

export abstract class BaseScriptEventCommandListener extends InMineAbstractEventListener<ScriptEventCommandMessageAfterEvent> {
  protected readonly messageId: string;

  constructor(
    options:
      | ScriptEventCommandListenOptions
      | ScriptEventCommandWithParamsListenOptions,
  ) {
    const namespace = options.id.split(':')[0];
    super({
      signal: system.afterEvents.scriptEventReceive,
      pipe: options.route.pipe,
      filter: namespace
        ? {
            namespaces: [namespace],
          }
        : undefined,
    });
    this.messageId = options.id;
  }

  protected executePipe(e: ScriptEventCommandMessageAfterEvent): void {}

  protected call(): EventRef<ScriptEventCommandMessageAfterEvent> {
    if (!!this.eventRef) {
      return this.eventRef;
    }
    return this.signal.subscribe((e) => {
      if (e.id === this.messageId) this.executePipe(e);
    });
  }

  protected generateContext(
    e: ScriptEventCommandMessageAfterEvent,
  ): ScriptEventContext {
    return {
      sourceType: e.sourceType,
      sourceBlock: e.sourceBlock,
      sourceEntity: e.sourceEntity,
      initiator: e.initiator,
    };
  }
}
