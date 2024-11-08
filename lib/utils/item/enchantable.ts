import { ItemEnchantableComponent, ItemStack } from '@minecraft/server';

export const enchantable = (
  item: ItemStack,
): ItemEnchantableComponent | undefined => {
  return item
    ? (item.getComponent('enchantable')! as ItemEnchantableComponent)
    : undefined;
};
