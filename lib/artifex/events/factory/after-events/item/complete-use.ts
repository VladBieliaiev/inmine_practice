import { ItemCompleteUseAfterListener } from '@inmine/artifex/events/listeners/item/item-complete-use';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { ItemCompleteUseAfterEventPipe } from '@inmine/artifex/events/pipes/item/complete-use.pipe';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';

export function completeUse<
  I extends Identifier,
  P extends ItemCompleteUseAfterEventPipe,
>(route: ItemUseEventRoute<I, P>) {
  return new ItemCompleteUseAfterListener(route);
}
