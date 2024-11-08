import { InMineEventPipe } from '@inmine/common/interfaces/events';

export abstract class InMineAbstractEventPipe<E> implements InMineEventPipe<E> {
  private nextPipe: InMineEventPipe<E> | undefined;

  public next<P extends InMineEventPipe<E>>(pipe: P): P {
    this.nextPipe = pipe;

    return pipe;
  }

  public execute(e: E): void {
    if (this.nextPipe) {
      return this.nextPipe.execute(e);
    }
  }
}
