import { ScriptEventRouteActionWithParams } from './route-action';

export type ScriptEventRoutePattenWithActionAndParamKeys = {
  action: ScriptEventRouteActionWithParams<any, any>;
  keys: string[];
};
