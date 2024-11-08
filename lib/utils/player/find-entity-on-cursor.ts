import { Entity, Player } from '@minecraft/server';

type FindEntityOnCursorOptions = {
  player: Player;
  distance: number;
  entityTypeId?: string;
};

/**
 * @returns An Array of entities the player is looking at.
 */
export function findEntityOnCursor(
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

  return options.entityTypeId
    ? entities.filter((e) => e.typeId === options.entityTypeId)
    : entities;
}
