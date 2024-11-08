import { EquipmentSlot, ItemStack, Player } from '@minecraft/server';

import { equipment } from './player-utils-bundle';

export const setItemInHand = (
  player: Player,
  item: ItemStack | undefined,
): boolean => {
  return player !== undefined && player.isValid()
    ? equipment(player)!.setEquipment(EquipmentSlot.Mainhand, item)
    : false;
};
