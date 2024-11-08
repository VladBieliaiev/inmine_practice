import { ItemReleaseUseAfterEvent } from '@minecraft/server';

import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { Identifier } from '@inmine/common';
import { afterEvents } from '@inmine/common/constants/events/after-events';

import { ArtifexBaseItemUseEventListener } from './base-item-use';
import { ArtifexBaseItemEventPipe } from '../../pipes/item/base-item-use.pipe';

export class ItemReleaseUseAfterListener extends ArtifexBaseItemUseEventListener<ItemReleaseUseAfterEvent> {
  constructor(
    route: ItemUseEventRoute<
      Identifier,
      ArtifexBaseItemEventPipe<ItemReleaseUseAfterEvent>
    >,
  ) {
    super(afterEvents.itemReleaseUse, route);
  }
}
