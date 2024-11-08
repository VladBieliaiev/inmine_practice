import {
  Block,
  BlockInventoryComponent,
  BlockPermutation,
  Dimension,
  Vector3,
} from '@minecraft/server';

import {
  BlockState,
  DimensionTypes,
  CanPlaceBlockOptions,
} from '@inmine/common/types';
import { rawDimensionId } from '@inmine/utils/dimension/raw-dimension-id';
import { center } from '@inmine/utils/location/center';
import { down } from '@inmine/utils/location/down';
import { simple } from '@inmine/utils/location/simple';
import { up } from '@inmine/utils/location/up';
import { validateHeight } from '@inmine/utils/location/validate-height';

import { BaseVectorModel } from '../vector/base-vector-model';

export class BaseBlockModel extends BaseVectorModel {
  private _source: Block | undefined;

  constructor(
    location: Vector3,
    private readonly _dimension: Dimension,
  ) {
    super(location);

    this._location.y = validateHeight(this.location, this.dimension).y;
    this._source = this.source;
  }

  get location(): Vector3 {
    return { ...this._location };
  }

  get dimension(): Dimension {
    return this._dimension;
  }

  /**
   * @returns A simple version of the Base Block model block position.
   */
  get simple(): BaseBlockModel {
    return new BaseBlockModel(simple(this.location), this.dimension);
  }
  /**
   * @returns Base Block model at the center of the block.
   */
  get center(): BaseBlockModel {
    return new BaseBlockModel(center(this.location), this.dimension);
  }
  /**
   * @returns The Base Block model dimension name as string.
   */
  get dimensionId(): DimensionTypes {
    return rawDimensionId(this.dimension);
  }

  private getBlock(): Block | undefined {
    try {
      const positionBasedBlock = this.dimension.getBlock(this.location);
      if (positionBasedBlock) {
        return positionBasedBlock;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @returns The Block of this Base Block model.
   */
  get source(): Block | undefined {
    if (!this._source || !this._source.isValid()) {
      this._source = this.getBlock();
    }
    return this._source;
  }

  /**
   * @returns The Base Block model above this location based on pitch and yaw.
   */
  down(distance: number = 1): BaseBlockModel {
    return new BaseBlockModel(down(this.location, distance), this.dimension);
  }

  /**
   * @returns The location below this location based on pitch and yaw
   */
  up(distance: number = 1): BaseBlockModel {
    return new BaseBlockModel(up(this.location, distance), this.dimension);
  }

  /**
   * @returns The inventory container of this Base Block model.
   */
  inventory(): BlockInventoryComponent | undefined {
    return this.source ? this.source.getComponent('inventory') : undefined;
  }

  /**
   * Sets the block on the current Base Block model position.
   * @returns True if block successfully set.
   */
  setBlock(blockName: string = 'air', state: BlockState = undefined): boolean {
    if (!this.source) {
      return false;
    }
    if (!state) {
      this.source.setPermutation(BlockPermutation.resolve(blockName));
    } else {
      this.source.setPermutation(BlockPermutation.resolve(blockName, state));
    }
    return this.matchesMaterial(blockName);
  }

  /**
   * @returns True if the current Base Block model position material matches
   * at least one input material or state.
   */
  matchesMaterial(
    blockName: string | string[] = 'air',
    state: BlockState = undefined,
  ): boolean {
    if (!this.source) {
      return false;
    }
    if (Array.isArray(blockName)) {
      const permutation = this.source.permutation;
      for (const name of blockName) {
        if (permutation.matches(name, state)) {
          return true;
        }
      }

      return false;
    } else {
      return this.source.permutation.matches(blockName, state);
    }
  }

  /**
   * @returns True if current location is valid to place a new block.
   */
  canPlace(options?: CanPlaceBlockOptions): boolean {
    if (!this.source) {
      return false;
    }
    const permutation = this.source.permutation;
    const validMaterials = [
      'air',
      'lava',
      'water',
      'snow_layer',
      'tallgrass',
      'double_plant',
    ];
    for (const material of validMaterials) {
      if (!permutation.matches(material)) {
        continue;
      }

      if (material === 'double_plant') {
        const states = permutation.getAllStates();
        if (!states || states.double_plant_type !== 'grass') {
          continue;
        }
      }

      if ((material === 'lava' || material === 'water') && options) {
        if (
          options.excludeLiquid ||
          (options.excludeLava && material === 'lava')
        ) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

  /**
   * @returns Current Base Block model clone.
   */
  clone() {
    return new BaseBlockModel(this.location, this.dimension);
  }

  /**
   * WIP
   */
  private get isSpawnable(): boolean {
    return this.getBlock()?.isAir ? true : false;
  }
}
