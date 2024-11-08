import { ItemUseOnAfterEvent, ItemUseOnBeforeEvent } from '@minecraft/server';

import { ArtifexBaseItemEventPipe } from './base-item-use.pipe';

export abstract class ItemUseOnAfterEventPipe extends ArtifexBaseItemEventPipe<ItemUseOnAfterEvent> {}

export abstract class ItemUseOnBeforeEventPipe extends ArtifexBaseItemEventPipe<ItemUseOnBeforeEvent> {}
