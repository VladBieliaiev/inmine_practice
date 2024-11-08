import { Entity, world } from '@minecraft/server';

import { ChunkSection } from '@inmine/common/types/chunk';
import { ChunkModelOptions } from '@inmine/common/types/models';
import { ChunkUtils } from '@inmine/utils/chunk';

import { ChunkModel } from './chunk-model';

export class ChunkModelFactory {
  private constructor() {}

  /**
   * Creates Chunk Model.
   */
  public static create(options: ChunkModelOptions) {
    return new ChunkModel(options);
  }

  /**
   * Creates Chunk Model using ChunkSection.
   */
  public static createUsingSection(section: ChunkSection) {
    return new ChunkModel({
      location: ChunkUtils.calculateCorner(section),
      dimension: world.getDimension(section.dimensionId),
    });
  }

  /**
   * Creates Chunk Model using ChunkSection.
   */
  public static createUsingEntity(entity: Entity) {
    return new ChunkModel({
      location: entity.location,
      dimension: entity.dimension,
    });
  }
}
