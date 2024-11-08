import { Entity, EntityRideableComponent } from '@minecraft/server';

export const rideable = (
  entity: Entity,
): EntityRideableComponent | undefined => {
  return entity.getComponent('rideable') as EntityRideableComponent | undefined;
};
