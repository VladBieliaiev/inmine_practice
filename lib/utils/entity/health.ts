import { Entity, EntityHealthComponent } from '@minecraft/server';

/**
 * @returns Entity current health amount.
 */
export const health = (entity: Entity): number | undefined => {
  if (!entity.isValid()) {
    return;
  }
  const healthComponent = entity.getComponent(
    'health',
  ) as EntityHealthComponent;
  if (healthComponent) {
    return healthComponent.currentValue;
  }
};
