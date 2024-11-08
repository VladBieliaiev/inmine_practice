import { EventRef, ArtifexEventFilters } from '@inmine/artifex/common';

export interface MinecraftEventSignal<E> {
  subscribe(callback: EventRef<E>, options?: ArtifexEventFilters): EventRef<E>;
  unsubscribe(callback: EventRef<E>): void;
}
