import {
  MinecraftEventSignal,
  ArtifexEventFilters,
} from '@inmine/artifex/common';
import { InMineEventPipe } from '@inmine/common/interfaces/events';
import { EventListenerParams, EventRef } from '@inmine/common/types/events';

export abstract class InMineAbstractEventListener<E> {
  protected eventRef: ((arg: E) => void) | undefined;
  protected pipe: InMineEventPipe<E>;
  protected signal: MinecraftEventSignal<E>;
  protected filter: ArtifexEventFilters | undefined;

  constructor(params: EventListenerParams<E>) {
    this.signal = params.signal;
    this.pipe = params.pipe;
    if (params.filter) {
      this.filter = params.filter;
    }
  }

  protected call(): EventRef<E> {
    return this.eventRef !== undefined
      ? this.eventRef
      : this.filter !== undefined
        ? this.signal.subscribe((e) => this.pipe.execute(e), this.filter)
        : this.signal.subscribe((e) => this.pipe.execute(e));
  }

  public listen(): void {
    this.eventRef = this.call();
  }
  public mute(): void {
    if (this.eventRef) {
      this.signal.unsubscribe(this.eventRef);
    }
  }
}
