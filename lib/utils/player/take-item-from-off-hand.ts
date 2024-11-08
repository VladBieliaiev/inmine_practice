import { GameMode, Player } from '@minecraft/server';

import { getOffHandItem } from './get-off-hand-item';
import { setItemInOffHand } from './set-item-in-off-hand';

export const takeItemFromOffHand = (
  player: Player,
  amount: number = 1,
  checkGamemode: boolean = false,
) => {
  if (checkGamemode) {
    if (
      ![GameMode.survival, GameMode.adventure].includes(player.getGameMode())
    ) {
      return;
    }
  }
  let item = getOffHandItem(player);
  if (!item || amount <= 0) {
    return;
  }

  if (item.amount <= amount) {
    item = undefined;
  } else {
    item.amount -= amount;
  }

  setItemInOffHand(player, item);
};
