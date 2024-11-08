import { EquipmentSlot, ItemStack, Player } from '@minecraft/server';

import { equipment } from '../entity/equipment';

export function getMainHandItem(player: Player): ItemStack | undefined {
  const playerEquipment = equipment(player);
  if (playerEquipment) {
    return playerEquipment.getEquipment(EquipmentSlot.Mainhand);
  }
}
