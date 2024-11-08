import { Container, ItemStack } from '@minecraft/server';

import { isEmpty } from './is-empty';

type ItemPerSlot = {
  [key: number]: ItemStack | undefined;
};

/**
 * @returns ItemStack from inventory slot. Can return undefined if slot is empty.
 */
export function getItemBySlots(
  container: Container,
  slots: number[],
): ItemPerSlot | undefined {
  if (isEmpty(container) || !slots.length) {
    return undefined;
  }

  const result: ItemPerSlot = {};
  for (const slot of slots.filter((v) => v > -1)) {
    result[slot] = container.getItem(slot);
  }

  return result;
}
