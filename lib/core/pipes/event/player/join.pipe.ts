import { Player, PlayerJoinAfterEvent, world } from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class PlayerJoinAfterEventPipe extends InMineAbstractEventPipe<PlayerJoinAfterEvent> {
  getPlayer(e: PlayerJoinAfterEvent): Player {
    const player = world.getEntity(e.playerId);
    if (!!player) {
      return player as Player;
    }
    return world.getPlayers({ name: e.playerName })[0];
  }
}
