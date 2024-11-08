import { ItemStopUseAfterListener } from '@inmine/artifex/events/listeners/item/item-stop-use';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { ItemStopUseAfterEventPipe } from '@inmine/artifex/events/pipes/item/stop-use.pipe';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';

export function stopUse<
  I extends Identifier,
  P extends ItemStopUseAfterEventPipe,
>(route: ItemUseEventRoute<I, P>) {
  return new ItemStopUseAfterListener(route);
}
