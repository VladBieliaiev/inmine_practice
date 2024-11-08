import { EntityModelImageProperties } from './entity-image-properties';

export type EntityModelImage = {
  identifier: string;
  properties?: EntityModelImageProperties;
  events?: readonly string[];
};
