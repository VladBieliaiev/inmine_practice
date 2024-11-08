import {
  DimensionTypes,
  Entity,
  EntityQueryOptions,
  world,
} from '@minecraft/server';

/**
 * @returns Entities from all dimensions using query options.
 */
export function getAllEntities(query: EntityQueryOptions): Entity[] {
  return DimensionTypes.getAll()
    .map((d) => world.getDimension(d.typeId).getEntities(query))
    .flat();
}
