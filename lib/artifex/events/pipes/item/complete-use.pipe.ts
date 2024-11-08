import { ItemCompleteUseAfterEvent } from '@minecraft/server';

import { ArtifexBaseItemEventPipe } from './base-item-use.pipe';

export abstract class ItemCompleteUseAfterEventPipe extends ArtifexBaseItemEventPipe<ItemCompleteUseAfterEvent> {}
