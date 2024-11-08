import { Player, world } from '@minecraft/server';

/**
 * @param playerName Player name
 * @returns Player by name.
 */
export function getPlayerByName(playerName: string = ''): Player | undefined {
  return world.getPlayers({
    name: playerName,
  })[0];
}
