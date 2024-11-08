import { ItemUseAfterEvent, ItemUseBeforeEvent } from '@minecraft/server';

import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { Identifier } from '@inmine/common';
import { afterEvents } from '@inmine/common/constants/events/after-events';
import { beforeEvents } from '@inmine/common/constants/events/before-events';

import { ArtifexBaseItemUseEventListener } from './base-item-use';
import { ArtifexBaseItemEventPipe } from '../../pipes/item/base-item-use.pipe';

export class ItemUseAfterListener extends ArtifexBaseItemUseEventListener<ItemUseAfterEvent> {
  constructor(
    route: ItemUseEventRoute<
      Identifier,
      ArtifexBaseItemEventPipe<ItemUseAfterEvent>
    >,
  ) {
    super(afterEvents.itemUse, route);
  }
}

export class ItemUseBeforeListener extends ArtifexBaseItemUseEventListener<ItemUseBeforeEvent> {
  constructor(
    route: ItemUseEventRoute<
      Identifier,
      ArtifexBaseItemEventPipe<ItemUseBeforeEvent>
    >,
  ) {
    super(beforeEvents.itemUse, route);
  }
}
