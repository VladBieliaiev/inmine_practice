import { ItemReleaseUseAfterEvent } from '@minecraft/server';

import { ArtifexBaseItemEventPipe } from './base-item-use.pipe';

export abstract class ItemReleaseUseAfterEventPipe extends ArtifexBaseItemEventPipe<ItemReleaseUseAfterEvent> {}
