import { ItemUseOnBeforeListener } from '@inmine/artifex/events/listeners/item/item-use-on';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { ItemUseOnBeforeEventPipe } from '@inmine/artifex/events/pipes/item/use-on.pipe';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';

export function useOn<I extends Identifier, P extends ItemUseOnBeforeEventPipe>(
  route: ItemUseEventRoute<I, P>,
) {
  return new ItemUseOnBeforeListener(route);
}
