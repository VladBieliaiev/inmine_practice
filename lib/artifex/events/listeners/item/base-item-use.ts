import { MinecraftEventSignal } from '@inmine/artifex/common';
import { ItemUseEventRoute } from '@inmine/artifex/events/listeners/types/item/route';
import { isAdvancedMatcher } from '@inmine/artifex/tools/advaned-matcher/is-advanced-matcher';
import { stringAdvancedMatches } from '@inmine/artifex/tools/advaned-matcher/string-advanced-matches';
import { EventRef, Identifier } from '@inmine/common/types';

import { ArtifexEventPipesStorage } from '../../pipes/event-pipes.storage';
import { ArtifexBaseItemEventPipe } from '../../pipes/item/base-item-use.pipe';
import {
  BaseItemUseEventContext,
  ArtifexBaseItemUseEventListenerInterface,
} from '../interfaces';
import { ArtifexSingleEventListener } from '../single-event-listener';

export class ArtifexBaseItemUseEventListener<E extends BaseItemUseEventContext>
  extends ArtifexSingleEventListener<E>
  implements ArtifexBaseItemUseEventListenerInterface
{
  private basicStorage: Map<string, ArtifexBaseItemEventPipe<E>> = new Map();
  private advancedMatchersStorage: Map<string, ArtifexBaseItemEventPipe<E>> =
    new Map();

  constructor(
    signal: MinecraftEventSignal<E>,
    route?: ItemUseEventRoute<Identifier, ArtifexBaseItemEventPipe<E>>,
  ) {
    super(signal, undefined);

    if (route) {
      this.add(route);
    }
  }

  public add<Id extends Identifier, Pipe extends ArtifexBaseItemEventPipe<E>>(
    route: ItemUseEventRoute<Id, Pipe>,
  ): ArtifexBaseItemUseEventListener<E> {
    if (!Array.isArray(route.itemId)) {
      route.itemId = [route.itemId];
    }

    const pipe = ArtifexEventPipesStorage.getOrCreate(route.pipe);

    route.itemId.forEach((id) => {
      (isAdvancedMatcher(id)
        ? this.advancedMatchersStorage
        : this.basicStorage
      ).set(id, pipe);
    });

    return this;
  }

  protected call(): EventRef<E> {
    return this.basicStorage.has('any')
      ? this.createGlobalSignal()
      : this.createSignalWithFilters();
  }

  private createGlobalSignal(): EventRef<E> {
    return this.signal.subscribe((e) => {
      this.basicStorage.get('any')!.execute(e as Required<E>);
    });
  }

  private createSignalWithFilters(): EventRef<E> {
    return this.advancedMatchersStorage.size === 0
      ? this.basicSignal()
      : this.signalWithAdvancedMatchers();
  }

  private basicSignal(): EventRef<E> {
    return this.signal.subscribe((e) => {
      if (e.itemStack) {
        this.basicStorage.get(e.itemStack.typeId)?.execute(e as Required<E>);
      }
    });
  }

  private signalWithAdvancedMatchers(): EventRef<E> {
    return this.signal.subscribe((e) => {
      if (e.itemStack) {
        if (this.basicStorage.has(e.itemStack.typeId)) {
          this.basicStorage.get(e.itemStack.typeId)!.execute(e as Required<E>);
        } else {
          this.advancedMatchersStorage.forEach((pipe, advancedItemId) => {
            if (stringAdvancedMatches(e.itemStack!.typeId, advancedItemId)) {
              pipe.execute(e as Required<E>);

              return;
            }
          });
        }
      }
    });
  }
}
