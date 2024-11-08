import { Entity } from '@minecraft/server';

import { ArtifexAbstractEntityModel } from './abstract-entity-model';
import { EntityModelNotFoundError } from './errors/entity-model-not-found';

export class ArtifexEntityModelStorageBase<
  M extends ArtifexAbstractEntityModel,
> {
  protected readonly STORAGE = new WeakMap<Entity, M>();
  constructor(
    protected readonly models: (typeof ArtifexAbstractEntityModel)[] = [],
  ) {}

  public add(entity: Entity, model: M): void {
    this.STORAGE.set(entity, model);
  }

  public getByEntity(entity: Entity): M {
    return this.STORAGE.get(entity) ?? this.create(entity);
  }

  public create(entity: Entity): M {
    const typeId = entity.typeId;
    const Model = this.models.find((m) => m.typeId === typeId);
    if (!Model) {
      throw EntityModelNotFoundError(entity);
    }
    const model = new Model(entity) as M;
    this.STORAGE.set(entity, model);

    return model;
  }

  public remove(entity: Entity): void {
    this.STORAGE.delete(entity);
  }
}
