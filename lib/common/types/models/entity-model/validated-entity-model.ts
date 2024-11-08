import { EntityModelImage } from './entity-image';

export type ValidatedEntityModel<T extends EntityModelImage> = {
  identifier: T['identifier'];
  properties: T['properties'] extends object ? T['properties'] : object;
  events: T['events'] extends readonly string[] ? T['events'] : [];
};
