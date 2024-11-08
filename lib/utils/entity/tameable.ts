import { Entity, EntityTameableComponent } from '@minecraft/server';

export const tameable = (
  entity: Entity,
): EntityTameableComponent | undefined => {
  return entity.isValid()
    ? (entity.getComponent('tameable') as EntityTameableComponent | undefined)
    : undefined;
};
