import { Identifier } from '@inmine/artifex/common/types/name/identifier';
import { ItemStopUseOnAfterListener } from '@inmine/artifex/events/listeners/item/item-stop-use-on';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { ItemStopUseOnAfterEventPipe } from '@inmine/artifex/events/pipes/item/stop-use.pipe';

export function stopUseOn<
  I extends Identifier,
  P extends ItemStopUseOnAfterEventPipe,
>(route: ItemUseEventRoute<I, P>) {
  return new ItemStopUseOnAfterListener(route);
}
