import { EntityModelImagePropertyNativeTypes } from './native-types';

export type EntityModelImageValidPropertyValues = Map<
  string,
  {
    type: EntityModelImagePropertyNativeTypes;
    values: EntityModelImagePropertyNativeTypes[];
  }
>;
