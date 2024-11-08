import { Entity, EntityInventoryComponent } from '@minecraft/server';

/**
 * @returns Entity inventory component or undefined.
 */
export const inventory = (
  entity: Entity,
): EntityInventoryComponent | undefined => {
  const inventoryComponent = entity.getComponent('inventory');
  if (inventoryComponent) {
    return inventoryComponent as EntityInventoryComponent;
  }
};
