import { ArtifexEventPipe } from '@inmine/artifex/common';

export abstract class ArtifexBaseEventPipe<E> implements ArtifexEventPipe<E> {
  protected nextPipe: ArtifexEventPipe<E> | undefined;

  public setNext<P extends ArtifexEventPipe<E>>(pipe: P): P {
    this.nextPipe = pipe;

    return pipe;
  }

  public next(e: E): void {
    if (this.nextPipe) {
      this.nextPipe.execute(e);
    }
  }

  public abstract execute(e: E): void;
}
