import { Entity, Player } from '@minecraft/server';

type FindEntityOnCursorOptions = {
  player: Player;
  distance: number;
  entityTypeIds: string[];
};

/**
 * @returns An Array of entities the player is looking at using a list of entity identifiers.
 */
export function findEntitiesOnCursor(
  options: FindEntityOnCursorOptions,
): Entity[] {
  if (!options.player) {
    return [];
  }

  const entities = options.player
    .getEntitiesFromViewDirection({
      maxDistance: options.distance,
    })
    .map((e) => {
      return e.entity;
    });
  if (!entities.length) {
    return [];
  }

  return entities.filter((e) => options.entityTypeIds.includes(e.typeId));
}
