import { Entity, Player, Vector3, world } from '@minecraft/server';

import {
  LocationModelOptions,
  ChunkModelOptions,
  ChunkSection,
} from '@inmine/common/types';
import { ChunkUtils } from '@inmine/utils/chunk';

import { ChunkModel } from './chunk-model';
import { LocationModel } from './location-model';
import { PlayerModel } from './player-model';

export class ModelFactory {
  public static location = {
    /**
     * Creates Location Model.
     */
    create(location: Vector3, options?: LocationModelOptions) {
      return new LocationModel(options);
    },
    /**
     * Creates Location Model using entity properties.
     */
    createUsingEntity(entity: Entity): LocationModel | undefined {
      if (!entity) return undefined;
      return new LocationModel({
        location: entity.location,
        dimension: entity.dimension,
        directionVector: entity.getViewDirection(),
      });
    },
  };

  public static player = {
    /**
     * Creates Player Model.
     * WIP
     */
    create(player: Player) {
      return new PlayerModel(player);
    },
  };

  public static chunk = {
    /**
     * Creates Chunk Model.
     */
    create(options: ChunkModelOptions) {
      return new ChunkModel(options);
    },

    /**
     * Creates Chunk Model using ChunkSection.
     */
    createUsingSection(section: ChunkSection) {
      return new ChunkModel({
        location: ChunkUtils.calculateCorner(section),
        dimension: world.getDimension(section.dimensionId),
      });
    },

    /**
     * Creates Chunk Model using ChunkSection.
     */
    createUsingEntity(entity: Entity) {
      return new ChunkModel({
        location: entity.location,
        dimension: entity.dimension,
      });
    },
  };
}
