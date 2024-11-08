import { Dimension, Entity, Vector3 } from '@minecraft/server';

import { Identifier } from '@inmine/common';
import { inventory } from '@inmine/utils/entity/inventory';

import { EntityCouldntBeAssinedToModelError } from './errors/entity-couldnt.be-assined-to-model';
import { EntityHasNoInventoryError } from './errors/entity-has-no-inventory';
import { InvalidEntityError } from './errors/invalid-entity';
import { InvalidEntityTypeIdError } from './errors/invalid-entity.type-id';
import { UnknownEntityError } from './errors/unknown-entity';
import { ArtifexEntityModel } from './interfaces/entity-model';
import { ArtifexEntityModelOptions } from './types/entity-model-options';

export class ArtifexEntityModelBase implements ArtifexEntityModel {
  protected readonly _typeId: Identifier;
  protected _entity: Entity | undefined;

  constructor(options: ArtifexEntityModelOptions) {
    this._typeId = options.typeId;
    if (options.entity) {
      this._entity = this.validateEntity(options.entity);
    }
  }

  public get typeId() {
    return this._typeId;
  }

  public get isValid() {
    return !!this._entity && this._entity.isValid();
  }

  public set entity(e: Entity) {
    if (!e.isValid()) {
      throw EntityCouldntBeAssinedToModelError(e, this);
    }
    this._entity = this.validateEntity(e);
  }

  public get entity() {
    return this.validateEntity(this._entity);
  }

  public spawn(location: Vector3, dimension: Dimension) {
    this._entity = dimension.spawnEntity(this.typeId, location);

    return this;
  }

  // Entity Components

  /**
   * @returns Entity inventory component.
   * @throws Error if entity does not have an inventory component.
   */
  public get inventory() {
    const inv = inventory(this.entity);

    if (!inv) {
      throw EntityHasNoInventoryError(this.entity);
    }
    return inv;
  }

  // Utilities

  protected validateEntity(e?: Entity) {
    if (!e) {
      throw UnknownEntityError(this);
    }

    if (e.typeId !== this._typeId) {
      throw InvalidEntityTypeIdError(e, this._typeId);
    }

    if (!e.isValid()) {
      throw InvalidEntityError(e);
    }

    return e;
  }
}
