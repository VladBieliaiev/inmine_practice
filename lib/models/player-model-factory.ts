import { Player } from '@minecraft/server';

import { PlayerModel } from './player-model';

export class PlayerModelFactory {
  private constructor() {}

  /**
   * Creates Player Model.
   * WIP
   */
  public static create(player: Player) {
    return new PlayerModel(player);
  }
}
