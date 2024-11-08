import { ItemStartUseOnAfterEvent } from '@minecraft/server';

import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { Identifier } from '@inmine/common';
import { afterEvents } from '@inmine/common/constants/events/after-events';

import { ArtifexBaseItemUseEventListener } from './base-item-use';
import { ArtifexBaseItemEventPipe } from '../../pipes/item/base-item-use.pipe';

export class ItemStartUseOnAfterListener extends ArtifexBaseItemUseEventListener<ItemStartUseOnAfterEvent> {
  constructor(
    route: ItemUseEventRoute<
      Identifier,
      ArtifexBaseItemEventPipe<ItemStartUseOnAfterEvent>
    >,
  ) {
    super(afterEvents.itemStartUseOn, route);
  }
}
