import { ItemStartUseAfterListener } from '@inmine/artifex/events/listeners/item/item-start-use';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { ItemStartUseAfterEventPipe } from '@inmine/artifex/events/pipes/item/start-use.pipe';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';

export function startUse<
  I extends Identifier,
  P extends ItemStartUseAfterEventPipe,
>(route: ItemUseEventRoute<I, P>) {
  return new ItemStartUseAfterListener(route);
}
