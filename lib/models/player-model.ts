import { Player } from '@minecraft/server';

import { ModelTypeNames } from '@inmine/common/enums';
import { BaseModel } from '@inmine/common/interfaces';

export class PlayerModel implements BaseModel {
  public readonly id: ModelTypeNames;
  public readonly player: Player;

  constructor(player: Player) {
    this.player = player;
    this.id = this.createId();
  }
  private createId() {
    return (ModelTypeNames.player + this.player.name) as ModelTypeNames;
  }
}
