import { ItemStopUseAfterEvent } from '@minecraft/server';

import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { afterEvents } from '@inmine/common/constants/events/after-events';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';

import { ArtifexBaseItemUseEventListener } from './base-item-use';
import { ArtifexBaseItemEventPipe } from '../../pipes/item/base-item-use.pipe';

export class ItemStopUseAfterListener extends ArtifexBaseItemUseEventListener<ItemStopUseAfterEvent> {
  constructor(
    route: ItemUseEventRoute<
      Identifier,
      ArtifexBaseItemEventPipe<ItemStopUseAfterEvent>
    >,
  ) {
    super(afterEvents.itemStopUse, route);
  }
}
