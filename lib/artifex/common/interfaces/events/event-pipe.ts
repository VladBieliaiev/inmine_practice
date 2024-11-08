export interface ArtifexEventPipe<E> {
  setNext<P extends ArtifexEventPipe<E>>(pipe: P): P;

  next(e: E): void;

  execute(e: E): void;
}
