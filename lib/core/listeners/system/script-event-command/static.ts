import { ScriptEventCommandMessageAfterEvent } from '@minecraft/server';

import {
  ScriptEventCommandListenOptions,
  ScriptEventCommandMessage,
  ScriptEventCommandRoute,
} from '@inmine/common/types/events/core';
import { ScriptEventCommandPipe } from '@inmine/core/pipes/event/system/script-event-command.pipe';

import { BaseScriptEventCommandListener } from './base';

export class ScriptEventCommandListener extends BaseScriptEventCommandListener {
  private readonly messages = new Map<
    ScriptEventCommandMessage,
    ScriptEventCommandPipe
  >();

  constructor(options: ScriptEventCommandListenOptions) {
    super(options);
    this.add(options.route);
  }

  public add(route: ScriptEventCommandRoute): ScriptEventCommandListener {
    if (!route.message) {
      // @TODO: Add throw message
      // throw
      return this;
    }
    this.messages.set(route.message, route.pipe);

    return this;
  }

  public remove(message: ScriptEventCommandMessage) {
    if (this.messages.has(message)) {
      this.messages.delete(message);
    }
  }

  protected executePipe(e: ScriptEventCommandMessageAfterEvent): void {
    const pipe = this.findPipe(e.message);
    if (pipe) {
      pipe.execute(this.generateContext(e));
    }
  }

  private findPipe(
    message: ScriptEventCommandMessage,
  ): ScriptEventCommandPipe | undefined {
    return this.messages.get(message);
  }
}
