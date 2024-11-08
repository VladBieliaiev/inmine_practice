import { ScriptEventContext } from '@inmine/common/types/events/core/script-event-command';

import { BaseScriptEventCommandAbstractPipe } from './base-script-event-command.pipe';

export abstract class ScriptEventCommandPipe extends BaseScriptEventCommandAbstractPipe<ScriptEventContext> {}
