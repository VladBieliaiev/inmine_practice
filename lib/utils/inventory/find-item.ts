import { Container } from '@minecraft/server';

import { Slot } from '@inmine/common/types';

import { isEmpty } from './is-empty';

/**
 * @returns Slot number of searched item. If container doesn't have specified item return -1.
 */
export function findItem(container: Container, itemId: string): Slot {
  if (!isEmpty(container) && itemId !== '') {
    for (let slot = 0; slot < container.size; slot++) {
      const item = container.getItem(slot);
      if (item && item.typeId === itemId) {
        return slot;
      }
    }
  }

  return -1;
}
