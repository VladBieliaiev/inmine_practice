import { MinecraftEventSignal } from '@inmine/artifex/common';
import { ArtifexEventFilters } from '@inmine/artifex/common/types/events/event-filters';
import { InMineEventPipe } from '@inmine/common/interfaces/events/event-pipe';

export type EventListenerParams<E> = {
  signal: MinecraftEventSignal<E>;
  pipe: InMineEventPipe<E>;
  filter?: ArtifexEventFilters;
};
