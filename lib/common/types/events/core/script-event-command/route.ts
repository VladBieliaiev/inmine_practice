import { ScriptEventCommandPipe } from '@inmine/core/pipes/event/system/script-event-command.pipe';

import {
  ScriptEventCommandMessage,
  ScriptEventCommandMessagePattern,
} from './message';

export type ScriptEventCommandRoute = {
  message: ScriptEventCommandMessage;
  pipe: ScriptEventCommandPipe;
};

export type ScriptEventCommandRouteWithPattern = {
  message: ScriptEventCommandMessagePattern;
  pipe: ScriptEventCommandPipe;
};
