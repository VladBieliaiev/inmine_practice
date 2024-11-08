import { BaseItemUseEventContext } from '../../listeners/interfaces/item';
import { ArtifexBaseEventPipe } from '../base-event.pipe';

export abstract class ArtifexBaseItemEventPipe<
  E extends BaseItemUseEventContext,
> extends ArtifexBaseEventPipe<E> {
  protected matchType(e: E, type: string): boolean {
    return e.itemStack !== undefined && e.itemStack.typeId === type;
  }
}
