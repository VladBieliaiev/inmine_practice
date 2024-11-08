import { Entity, EntityEquippableComponent } from '@minecraft/server';

/**
 * @returns Entity equippable component or undefined.
 */
export const equipment = (
  entity: Entity,
): EntityEquippableComponent | undefined => {
  const component = entity.getComponent('equippable');
  if (component) {
    return component as EntityEquippableComponent;
  }
};
