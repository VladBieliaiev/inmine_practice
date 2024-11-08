import { Container } from '@minecraft/server';

import { EmptySlotsArray } from '@inmine/common/types';

import { isEmpty } from './is-empty';
import { listNumbers } from '../array/list-numbers';

/**
 * @returns Array of empty slots.
 */
export function findEmptySlots(container: Container): EmptySlotsArray {
  if (isEmpty(container)) {
    return listNumbers(26);
  }

  const emptySlots: EmptySlotsArray = listNumbers(26);
  for (let slot = 0; slot < container.size; slot++) {
    const item = container.getItem(slot);
    if (item !== undefined) {
      emptySlots.splice(slot, 1);
    }
  }

  return emptySlots;
}
