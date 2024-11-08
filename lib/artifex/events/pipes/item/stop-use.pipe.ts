import {
  ItemStopUseAfterEvent,
  ItemStopUseOnAfterEvent,
} from '@minecraft/server';

import { ArtifexBaseItemEventPipe } from './base-item-use.pipe';

export abstract class ItemStopUseAfterEventPipe extends ArtifexBaseItemEventPipe<ItemStopUseAfterEvent> {}

export abstract class ItemStopUseOnAfterEventPipe extends ArtifexBaseItemEventPipe<ItemStopUseOnAfterEvent> {}
