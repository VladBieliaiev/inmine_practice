import {
  ArtifexEventListenerInterface,
  MinecraftEventSignal,
} from '@inmine/artifex/common';
import { ArtifexEventFilters } from '@inmine/artifex/common/types/events/event-filters';
import { EventRef } from '@inmine/common';

export abstract class ArtifexSingleEventListener<E>
  implements ArtifexEventListenerInterface
{
  protected eventRef: EventRef<E> | undefined;

  constructor(
    protected signal: MinecraftEventSignal<E>,
    protected filter: ArtifexEventFilters | undefined,
  ) {}

  protected abstract call(): EventRef<E>;

  public listen(): void {
    this.eventRef = this.call();
  }
  public mute(): void {
    if (this.eventRef) {
      this.signal.unsubscribe(this.eventRef);
    }
  }
}
