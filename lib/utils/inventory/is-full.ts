import { Container } from '@minecraft/server';

import { isEmpty } from './is-empty';

/**
 * @returns True if inventory is full.
 */
export function isFull(container: Container): boolean {
  if (isEmpty(container)) {
    return false;
  }

  for (let slot = 0; slot < container.size; slot++) {
    const item = container.getItem(slot);
    if (!item || item.amount < item.maxAmount) {
      return false;
    }
  }

  return true;
}
