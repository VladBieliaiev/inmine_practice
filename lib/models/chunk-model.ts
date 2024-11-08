import { Dimension } from '@minecraft/server';

import { overworld } from '@inmine/common/constants/dimension';
import { nullVector3 } from '@inmine/common/constants/location';
import { ModelTypeNames } from '@inmine/common/enums';
import { BaseModel } from '@inmine/common/interfaces';
import {
  ChunkModelOptions,
  ChunkSection,
  DimensionTypes,
  ChunkLoadOptions,
  ChunkLoadResult,
  ChunkSectionSimple,
} from '@inmine/common/types';
import { ChunkLoader } from '@inmine/tools/chunk-loader';
import { ChunkUtils } from '@inmine/utils/chunk';
import { DimensionUtils } from '@inmine/utils/dimension';

export class ChunkModel implements BaseModel {
  readonly id: ModelTypeNames;
  readonly dimension: Dimension = overworld;
  readonly section: ChunkSection;
  readonly sectionSimple: ChunkSectionSimple;
  private readonly loader = new ChunkLoader();

  constructor(
    options: ChunkModelOptions = {
      location: nullVector3,
      dimension: overworld,
    },
  ) {
    if (options.dimension) {
      this.dimension = options.dimension;
    }
    const position = options.location;

    if (position.y > this.dimension.heightRange.max) {
      position.y = this.dimension.heightRange.max;
    } else if (position.y < this.dimension.heightRange.min) {
      position.y = this.dimension.heightRange.min;
    }

    this.section = ChunkUtils.calculateSection(position);
    this.sectionSimple = `${this.section.x},${this.section.y},${this.section.z},${DimensionUtils.rawDimensionId(this.dimension)}`;
    this.id = this.createId();
  }

  get dimensionId() {
    return this.dimension.id as DimensionTypes;
  }

  get center() {
    return ChunkUtils.center(this.section);
  }

  get forceLoadStats() {
    if (!this.isForceLoaded()) return;
    return this.loader.forceLoadedChunksStats();
  }

  add(shift: ChunkSection): ChunkModel {
    const section = {
      x: this.section.x + shift.x,
      y: this.section.y + shift.y,
      z: this.section.z + shift.z,
      dimensionId: this.dimensionId,
    };
    const corner = ChunkUtils.calculateCorner(section);

    return new ChunkModel({ location: corner, dimension: this.dimension });
  }

  withSection(section: ChunkSection): ChunkModel {
    return new ChunkModel({
      location: ChunkUtils.calculateCorner(section),
      dimension: this.dimension,
    });
  }

  isLoaded() {
    if (!this.dimension.getBlock(this.center)) {
      return false;
    }
    return true;
  }

  isForceLoaded() {
    return this.loader.isForceLoaded(this);
  }

  async forceLoad(
    options: ChunkLoadOptions,
  ): Promise<ChunkLoadResult | boolean> {
    if (this.isForceLoaded()) {
      return true;
    }
    return await this.loader.load(this, options);
  }

  async unload() {
    if (!this.isForceLoaded()) {
      return;
    }

    return await this.loader.unload(this);
  }

  private createId() {
    const chunkData = {
      ...this.section,
      dimension: this.dimensionId,
    };

    return (ModelTypeNames.chunk +
      JSON.stringify(chunkData)) as ModelTypeNames.chunk;
  }
}
