import { ScriptEventCommandMessageAfterEvent } from '@minecraft/server';

import { ParamsFromPattern } from '../core/script-event-command/params-from-pattern';

export type ScriptEventRouteAction<Data = any> = (
  eventData: ScriptEventCommandMessageAfterEvent,
  routeData?: Data,
) => void;

export type ScriptEventRouteActionWithParams<
  Params extends string,
  Data = any,
> = (
  eventData: ScriptEventCommandMessageAfterEvent,
  params: ParamsFromPattern<Params>,
  routeData?: Data,
) => void;
