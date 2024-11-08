import { GameMode, Player } from '@minecraft/server';

import { getMainHandItem } from './get-main-hand-item';
import { setItemInHand } from './set-item-in-hand';

export const takeItemFromHand = (
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
  let item = getMainHandItem(player);
  if (!item || amount <= 0) {
    return;
  }

  if (item.amount <= amount) {
    item = undefined;
  } else {
    item.amount -= amount;
  }

  setItemInHand(player, item);
};
