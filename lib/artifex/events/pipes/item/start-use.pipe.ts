import {
  ItemStartUseAfterEvent,
  ItemStartUseOnAfterEvent,
} from '@minecraft/server';

import { ArtifexBaseItemEventPipe } from './base-item-use.pipe';

export abstract class ItemStartUseAfterEventPipe extends ArtifexBaseItemEventPipe<ItemStartUseAfterEvent> {}

export abstract class ItemStartUseOnAfterEventPipe extends ArtifexBaseItemEventPipe<ItemStartUseOnAfterEvent> {}
