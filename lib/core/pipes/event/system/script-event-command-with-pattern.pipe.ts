import {
  ScriptEventCommandMessagePattern,
  ScriptEventContextWithParams,
} from '@inmine/common/types/events/core/script-event-command';

import { BaseScriptEventCommandAbstractPipe } from './base-script-event-command.pipe';

export abstract class ScriptEventCommandPipeWithPattern<
  T extends ScriptEventCommandMessagePattern,
> extends BaseScriptEventCommandAbstractPipe<ScriptEventContextWithParams<T>> {}
