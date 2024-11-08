import { ArtifexBaseItemEventPipe } from '@inmine/artifex/events/pipes/item/base-item-use.pipe';
import { Identifier } from '@inmine/common';

import { ItemUseEventRoute } from './route';
import { BaseItemUseEventContext } from '../../interfaces';

export type DefaultItemUseEventRoute = ItemUseEventRoute<
  Identifier,
  ArtifexBaseItemEventPipe<BaseItemUseEventContext>
>;
