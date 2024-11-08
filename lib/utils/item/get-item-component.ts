import { Entity, EntityItemComponent } from '@minecraft/server';

/**
 * @returns Entity item component if entity is item.
 */
export function getItemComponent(
  entity: Entity,
): EntityItemComponent | undefined {
  return entity && entity.typeId === 'minecraft:item'
    ? (entity.getComponent('item')! as EntityItemComponent)
    : undefined;
}
