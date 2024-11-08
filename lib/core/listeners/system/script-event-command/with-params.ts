import { ScriptEventCommandMessageAfterEvent } from '@minecraft/server';

import {
  scriptEventMessagePatternMatcher,
  scriptEventPatternMatcher,
} from '@inmine/common/constants/events/script-event';
import {
  ScriptEventCommandMessage,
  ScriptEventCommandMessagePattern,
  ScriptEventCommandMessagePatternWithParamsAmount,
  ScriptEventCommandWithParamsListenOptions,
  ScriptEventCommandPatternKeysAndPipe,
  ScriptEventCommandRouteWithPattern,
} from '@inmine/common/types/events/core';

import { BaseScriptEventCommandListener } from './base';

export class ScriptEventCommandWithParamsListener extends BaseScriptEventCommandListener {
  private readonly messages = new Map<
    ScriptEventCommandMessagePatternWithParamsAmount,
    ScriptEventCommandPatternKeysAndPipe<any>
  >();

  constructor(options: ScriptEventCommandWithParamsListenOptions) {
    super(options);
    this.add(options.route);
  }

  public add(
    route: ScriptEventCommandRouteWithPattern,
  ): ScriptEventCommandWithParamsListener {
    if (!route.message) {
      // @TODO: Add throw message
      // throw
      return this;
    }

    this.messages.set(this.patternWithParamsAmount(route.message), {
      pipe: route.pipe,
      keys: this.getPatternParams(route.message),
    });

    return this;
  }

  public remove(message: ScriptEventCommandMessage) {
    if (!this.matchesPattern(message)) {
      return;
    }
    const pattern = this.patternWithParamsAmount(
      message as ScriptEventCommandMessagePattern,
    );
    if (this.messages.has(pattern)) {
      this.messages.delete(pattern);
    }
  }

  protected executePipe(e: ScriptEventCommandMessageAfterEvent): void {
    if (!this.matchesMessagePattern(e.message)) {
      return;
    }

    const patternMessage = e.message as ScriptEventCommandMessagePattern;
    const keysAndPipe = this.findPipe(patternMessage);
    if (keysAndPipe?.pipe) {
      keysAndPipe.pipe.execute({
        ...this.generateContext(e),
        params: this.createParamsObject(keysAndPipe.keys, patternMessage),
      });
    }
  }

  private findPipe(
    message: ScriptEventCommandMessagePattern,
  ): ScriptEventCommandPatternKeysAndPipe<any> | undefined {
    return this.messages.get(this.patternWithParamsAmount(message));
  }

  private matchesPattern(message: ScriptEventCommandMessage) {
    return message.match(scriptEventPatternMatcher);
  }

  private matchesMessagePattern(message: ScriptEventCommandMessage) {
    return message.match(scriptEventMessagePatternMatcher);
  }

  private patternWithParamsAmount(
    pattern: ScriptEventCommandMessagePattern,
  ): ScriptEventCommandMessagePatternWithParamsAmount {
    const patternKeys = pattern.split('/');
    const patternId = patternKeys[0];
    const filteredKeys = patternKeys.filter((k) => k !== ':');

    return `${patternId}_${filteredKeys.length - 1}`;
  }

  private getPatternParams(pattern: ScriptEventCommandMessagePattern) {
    const result = pattern.split('/:');
    result.splice(0, 1);

    return result;
  }

  private createParamsObject(keysArray: string[], message: string) {
    const result: any = {};
    const params = message.split('/');
    params.splice(0, 1);
    keysArray.forEach((key, i) => {
      result[key] = params[i];
    });

    return result;
  }
}
