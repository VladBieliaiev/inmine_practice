import { Player, world } from '@minecraft/server';

/**
 * @param playerId Player id as string.
 * @returns Player by id.
 */
export function getPlayerById(playerId: string): Player | undefined {
  return playerId
    ? (world.getEntity(playerId) as Player | undefined)
    : undefined;
}
