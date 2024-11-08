import { Container, Entity } from '@minecraft/server';

import { inventory } from './inventory';

/**
 * @returns Entity inventory container or undefined.
 */
export const inventoryContainer = (entity: Entity): Container | undefined => {
  const inventoryComponent = inventory(entity);
  if (inventoryComponent) {
    return inventoryComponent.container;
  }
};
