import { Block, Entity } from '@minecraft/server';

import { LocationModelOptions } from '@inmine/common/types/models';
import { EntityModelImage } from '@inmine/common/types/models/entity-model';

import { InMineAbstractEntityModel } from './entity';
import { LocationModel } from './location-model';

export class LocationModelFactory {
  private constructor() {}

  /**
   * Creates a new LocationModel.
   */
  public static create(options?: LocationModelOptions) {
    return new LocationModel(options);
  }

  /**
   * Creates a new LocationModel using entity properties.
   */
  public static createUsingEntity(entity: Entity): LocationModel | undefined {
    if (!entity) return undefined;
    return new LocationModel({
      location: entity.location,
      dimension: entity.dimension,
      directionVector: entity.getViewDirection(),
    });
  }

  /**
   * Creates a new LocationModel using block properties.
   */
  public static createUsingBlock(block: Block): LocationModel | undefined {
    if (!block.isValid()) {
      return;
    }
    return new LocationModel({
      location: block.location,
      dimension: block.dimension,
    });
  }

  public static createUsingEntityModel<
    Model extends InMineAbstractEntityModel<EntityModelImage>,
  >(model: Model): LocationModel | undefined {
    const entity = model.entity;

    return entity !== undefined
      ? new LocationModel({
          location: entity.location,
          dimension: entity.dimension,
          directionVector: entity.getViewDirection(),
        })
      : undefined;
  }
}
