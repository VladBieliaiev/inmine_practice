import { ItemUseOnAfterEvent, ItemUseOnBeforeEvent } from '@minecraft/server';

import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { afterEvents } from '@inmine/common/constants/events/after-events';
import { beforeEvents } from '@inmine/common/constants/events/before-events';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';

import { ArtifexBaseItemUseEventListener } from './base-item-use';
import { ArtifexBaseItemEventPipe } from '../../pipes/item/base-item-use.pipe';

export class ItemUseOnAfterListener extends ArtifexBaseItemUseEventListener<ItemUseOnAfterEvent> {
  constructor(
    route: ItemUseEventRoute<
      Identifier,
      ArtifexBaseItemEventPipe<ItemUseOnAfterEvent>
    >,
  ) {
    super(afterEvents.itemUseOn, route);
  }
}

export class ItemUseOnBeforeListener extends ArtifexBaseItemUseEventListener<ItemUseOnBeforeEvent> {
  constructor(
    route: ItemUseEventRoute<
      Identifier,
      ArtifexBaseItemEventPipe<ItemUseOnBeforeEvent>
    >,
  ) {
    super(beforeEvents.itemUseOn, route);
  }
}
