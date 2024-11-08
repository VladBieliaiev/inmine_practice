import { ItemUseOnAfterListener } from '@inmine/artifex/events/listeners/item/item-use-on';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { ItemUseOnAfterEventPipe } from '@inmine/artifex/events/pipes/item/use-on.pipe';
import { Identifier } from '@inmine/common';

export function useOn<I extends Identifier, P extends ItemUseOnAfterEventPipe>(
  route: ItemUseEventRoute<I, P>,
) {
  return new ItemUseOnAfterListener(route);
}
