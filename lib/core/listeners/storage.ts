import { CreatableClass } from '@inmine/common';
import { InMineEventListenerInterface } from '@inmine/common/interfaces/events/event-listener';

export class EventListenersStorage {
  private static _storage: InMineEventListenerInterface[] = [];
  public static add<L extends InMineEventListenerInterface>(listener: L): L {
    this._storage.push(listener);

    return listener;
  }

  public static getByName<L extends InMineEventListenerInterface>(
    listener: CreatableClass<L>,
  ): L | undefined {
    return this._storage.find((l) => l instanceof listener) as L | undefined;
  }
}
