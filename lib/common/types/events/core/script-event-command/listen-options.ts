import { ScriptEventCommandId } from './id';
import {
  ScriptEventCommandRoute,
  ScriptEventCommandRouteWithPattern,
} from '..';

export type ScriptEventCommandListenOptions = {
  id: ScriptEventCommandId;
  route: ScriptEventCommandRoute;
};

export type ScriptEventCommandWithParamsListenOptions = {
  id: ScriptEventCommandId;
  route: ScriptEventCommandRouteWithPattern;
};
