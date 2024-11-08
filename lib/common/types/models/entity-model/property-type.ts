import { KeysFromArray } from '@inmine/common/types/base/keys-from-array';

import { EntityModelImageProperties } from './entity-image-properties';
import { EntityModelImageEnumProperty } from './properties/enum-property';
import { EntityModelImageNumberProperty } from './properties/number-property';

export type EntityModelImagePropertyType<
  K extends string,
  P extends EntityModelImageProperties | object,
> =
  P extends Record<string, any>
    ? P[K] extends EntityModelImageNumberProperty
      ? number
      : P[K] extends EntityModelImageEnumProperty
        ? KeysFromArray<P[K]['values']>
        : true | false
    : undefined;
