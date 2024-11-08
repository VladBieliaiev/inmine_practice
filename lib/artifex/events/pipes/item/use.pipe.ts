import { ItemUseAfterEvent, ItemUseBeforeEvent } from '@minecraft/server';

import { ArtifexBaseItemEventPipe } from './base-item-use.pipe';

export abstract class ItemUseAfterEventPipe extends ArtifexBaseItemEventPipe<ItemUseAfterEvent> {}

export abstract class ItemUseBeforeEventPipe extends ArtifexBaseItemEventPipe<ItemUseBeforeEvent> {}
