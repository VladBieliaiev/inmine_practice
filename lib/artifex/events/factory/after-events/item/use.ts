import { ItemUseAfterListener } from '@inmine/artifex/events/listeners/item/item-use';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { ItemUseAfterEventPipe } from '@inmine/artifex/events/pipes/item/use.pipe';
import { Identifier } from '@inmine/common';

export function use<I extends Identifier, P extends ItemUseAfterEventPipe>(
  route: ItemUseEventRoute<I, P>,
) {
  return new ItemUseAfterListener(route);
}
