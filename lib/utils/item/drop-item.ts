import { Dimension, Entity, ItemStack, Vector3 } from '@minecraft/server';

type ItemTypeIdAndAmount = { itemType: string; amount?: number };

/**
 * Drops a new item stack as an entity at the specified location.
 * Can create a new item stack using itemType and amount params.
 * @returns Item entity.
 */
export function dropItem(
  item: ItemStack | ItemTypeIdAndAmount,
  dimension: Dimension,
  location: Vector3,
): Entity | undefined {
  if (!(item instanceof ItemStack)) {
    item = new ItemStack(item.itemType, item.amount ? item.amount : 1);
  }
  return dimension.spawnItem(item, location);
}
