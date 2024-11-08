import { BaseItemUseEventContext } from '@inmine/artifex/events/listeners/interfaces';
import { ArtifexBaseItemEventPipe } from '@inmine/artifex/events/pipes/item/base-item-use.pipe';

import { CreatableClass } from '../../../../../common/types/base';
import { Identifier } from '../../../../common/types/name';

export type ItemUseEventRoute<
  Id extends Identifier,
  Pipe extends ArtifexBaseItemEventPipe<BaseItemUseEventContext>,
> = {
  itemId: Id | Id[] | string | string[] | 'any';
  pipe: CreatableClass<Pipe>;
};
