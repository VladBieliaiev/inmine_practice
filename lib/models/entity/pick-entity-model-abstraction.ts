import {
  CollectionFromObjects,
  CombineObjectsFromArray,
} from '@inmine/common/types/base';
import { FlagRepositoryId, FlagSchemaRecord } from '@inmine/common/types/flags';
import { EntityModelImage } from '@inmine/common/types/models/entity-model';

import { InMineAbstractEntityModel } from './entity-abstract-model';
import { InMineAbstractEntityModelWithFlags } from './entity-abstract-model-with-flags';

export const PickEntityModel = <T extends EntityModelImage>(image: T) => {
  return InMineAbstractEntityModel<typeof image>;
};

export const PickEntityModelWithFlag = <
  Flags extends FlagSchemaRecord<FlagRepositoryId, any>[],
  T extends EntityModelImage,
>(
  image: T,
) => {
  return InMineAbstractEntityModelWithFlags<
    typeof image,
    CollectionFromObjects<CombineObjectsFromArray<Flags>>
  >;
};
