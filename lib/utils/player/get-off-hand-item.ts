import { EquipmentSlot, ItemStack, Player } from '@minecraft/server';

import { equipment } from '../entity/equipment';

export function getOffHandItem(player: Player): ItemStack | undefined {
  const playerEquipment = equipment(player);
  if (playerEquipment) {
    return playerEquipment.getEquipment(EquipmentSlot.Offhand);
  }
}
