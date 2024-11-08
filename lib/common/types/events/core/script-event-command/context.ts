import { Block, Entity, ScriptEventSource } from '@minecraft/server';

import { ScriptEventCommandMessagePattern } from './message';
import { ParamsFromPattern } from './params-from-pattern';

export type ScriptEventContext = {
  initiator?: Entity;
  sourceBlock?: Block;
  sourceEntity?: Entity;
  sourceType: ScriptEventSource;
};

export type ScriptEventContextWithParams<
  P extends ScriptEventCommandMessagePattern,
> = ScriptEventContext & {
  params: ParamsFromPattern<P>;
};
