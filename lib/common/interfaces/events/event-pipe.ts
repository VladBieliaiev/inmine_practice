export interface InMineEventPipe<E> {
  next(pipe: InMineEventPipe<E>): InMineEventPipe<E>;

  execute(e: E): void;
}
