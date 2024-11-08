import { Entity, EntityInventoryComponent } from '@minecraft/server';

import { ArtifexEntityModelProperties } from '../entity-model-properties';

export interface ArtifexEntityModel {
  isValid: boolean;
  entity: Entity;
  inventory: EntityInventoryComponent;
  readonly properties?: ArtifexEntityModelProperties;
}
