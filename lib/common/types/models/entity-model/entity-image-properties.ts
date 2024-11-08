import { EntityModelImageBooleanProperty } from './properties/boolean-property';
import { EntityModelImageEnumProperty } from './properties/enum-property';
import { EntityModelImageNumberProperty } from './properties/number-property';

export type EntityModelImageProperties = {
  readonly [key: string]:
    | EntityModelImageNumberProperty
    | EntityModelImageEnumProperty
    | EntityModelImageBooleanProperty;
};
