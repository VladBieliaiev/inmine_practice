import { Container } from '@minecraft/server';

import { ItemSlotsArray } from '@inmine/common/types';

import { isEmpty } from './is-empty';

/**
 * @returns Slots of specified item ids.
 */
export function findAllItems(
  container: Container,
  itemId: string,
): ItemSlotsArray {
  if (isEmpty(container) || itemId === '') {
    return [];
  }

  const itemSlots: ItemSlotsArray = [];
  for (let slot = 0; slot < container.size; slot++) {
    const item = container.getItem(slot);
    if (!item || item.typeId !== itemId) {
      continue;
    }
    itemSlots.push(slot);
  }

  return itemSlots;
}
