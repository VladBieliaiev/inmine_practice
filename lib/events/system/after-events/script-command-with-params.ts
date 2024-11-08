import { ScriptEventCommandWithParamsListenOptions } from '@inmine/common/types/events/core/script-event-command';
import { ScriptEventCommandWithParamsListener } from '@inmine/core/listeners/system/script-event-command/with-params';

export function scriptCommandWithParams(
  options: ScriptEventCommandWithParamsListenOptions,
) {
  return new ScriptEventCommandWithParamsListener(options);
}
