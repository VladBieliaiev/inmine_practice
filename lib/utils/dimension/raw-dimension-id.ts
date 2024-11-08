import { Dimension } from '@minecraft/server';

import { DimensionTypes } from '@inmine/common/types';

/**
 * @returns Raw Dimension id like 'overworld'. Without 'minecraft:' namespace.
 */
export const rawDimensionId = (dimension: Dimension): DimensionTypes => {
  return dimension.id.split(':')[1] as DimensionTypes;
};
