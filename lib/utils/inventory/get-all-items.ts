import { Container, ItemStack } from '@minecraft/server';

import { isEmpty } from './is-empty';

/**
 * @returns Array of items from specified inventory.
 */
export function getAllItems(container: Container): ItemStack[] {
  if (isEmpty(container)) {
    return [];
  }

  const items: ItemStack[] = [];
  for (let slot = 0; slot < container.size; slot++) {
    const item = container.getItem(slot);
    if (item !== undefined) {
      items.push(item);
    }
  }

  return items;
}
