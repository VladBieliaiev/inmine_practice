import { InMineEventListenerInterface } from '@inmine/common/interfaces/events/event-listener';

export const registerListeners = (
  listeners: InMineEventListenerInterface[],
) => {
  listeners.forEach((listener) => {
    listener.listen();
  });
};
