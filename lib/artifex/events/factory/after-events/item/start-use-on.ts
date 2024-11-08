import { ItemStartUseOnAfterListener } from '@inmine/artifex/events/listeners/item/item-start-use-on';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { ItemStartUseOnAfterEventPipe } from '@inmine/artifex/events/pipes/item/start-use.pipe';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';

export function startUseOn<
  I extends Identifier,
  P extends ItemStartUseOnAfterEventPipe,
>(route: ItemUseEventRoute<I, P>) {
  return new ItemStartUseOnAfterListener(route);
}
