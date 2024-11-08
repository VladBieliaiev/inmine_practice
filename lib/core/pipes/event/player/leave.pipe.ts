import {
  Player,
  PlayerLeaveAfterEvent,
  PlayerLeaveBeforeEvent,
  world,
} from '@minecraft/server';

import { InMineAbstractEventPipe } from '@inmine/core/pipes/event/event-pipe';

export abstract class PlayerLeaveAfterEventPipe extends InMineAbstractEventPipe<PlayerLeaveAfterEvent> {
  getPlayer(e: PlayerLeaveAfterEvent): Player | undefined {
    const player = world.getEntity(e.playerId);
    if (!!player) {
      return player as Player;
    }
    return world.getPlayers({ name: e.playerName })[0];
  }
}

export abstract class PlayerLeaveBeforeEventPipe extends InMineAbstractEventPipe<PlayerLeaveBeforeEvent> {
  getPlayer(e: PlayerLeaveBeforeEvent): Player | undefined {
    return e.player;
  }
}
