import { ItemUseBeforeListener } from '@inmine/artifex/events/listeners/item/item-use';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { ItemUseBeforeEventPipe } from '@inmine/artifex/events/pipes/item/use.pipe';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';

export function use<I extends Identifier, P extends ItemUseBeforeEventPipe>(
  route: ItemUseEventRoute<I, P>,
) {
  return new ItemUseBeforeListener(route);
}
