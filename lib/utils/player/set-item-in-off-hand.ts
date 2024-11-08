import { EquipmentSlot, ItemStack, Player } from '@minecraft/server';

import { equipment } from './player-utils-bundle';

export const setItemInOffHand = (
  player: Player,
  item: ItemStack | undefined,
): boolean => {
  return player !== undefined && player.isValid()
    ? equipment(player)!.setEquipment(EquipmentSlot.Offhand, item)
    : false;
};
