import { ScriptEventCommandListenOptions } from '@inmine/common/types';
import { ScriptEventCommandListener } from '@inmine/core/listeners/system/script-event-command/static';

export function scriptCommand(options: ScriptEventCommandListenOptions) {
  return new ScriptEventCommandListener(options);
}
