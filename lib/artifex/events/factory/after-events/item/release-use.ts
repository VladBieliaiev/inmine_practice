import { ItemReleaseUseAfterListener } from '@inmine/artifex/events/listeners/item/item-release-use';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { ItemReleaseUseAfterEventPipe } from '@inmine/artifex/events/pipes/item/release-use.pipe';
import { Identifier } from '@inmine/artifex/common/types/name/identifier';

export function releaseUse<
  I extends Identifier,
  P extends ItemReleaseUseAfterEventPipe,
>(route: ItemUseEventRoute<I, P>) {
  return new ItemReleaseUseAfterListener(route);
}
