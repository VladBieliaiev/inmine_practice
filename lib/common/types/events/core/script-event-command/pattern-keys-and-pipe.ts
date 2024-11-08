import { ScriptEventCommandPipeWithPattern } from '@inmine/core/pipes/event/system/script-event-command-with-pattern.pipe';

import { ScriptEventCommandMessagePattern } from './message';

export type ScriptEventCommandPatternKeysAndPipe<
  P extends ScriptEventCommandMessagePattern,
> = {
  pipe: ScriptEventCommandPipeWithPattern<P>;
  keys: string[];
};
