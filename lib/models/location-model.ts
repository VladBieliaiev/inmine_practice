import {
  Block,
  BlockInventoryComponent,
  BlockPermutation,
  Dimension,
  Vector3,
} from '@minecraft/server';

import { overworld } from '@inmine/common/constants/dimension';
import {
  directionVectors,
  nullVector3,
} from '@inmine/common/constants/location';
import {
  LocationModelOptions,
  DirectionVector,
  Pitch,
  Yaw,
  BlockState,
  ResultWithSuccess,
  DimensionTypes,
  SimpleLocationWithDimensionAsString,
  YawAsDirectionSimple,
  YawAsDirection,
  DirectionName,
  CanPlaceBlockOptions,
} from '@inmine/common/types';
import { LocationUtils } from '@inmine/utils/location';
import { VectorUtils } from '@inmine/utils/vector';

export class LocationModel {
  public readonly position: Vector3 = nullVector3;
  public readonly x: number = nullVector3.x;
  public readonly y: number = nullVector3.y;
  public readonly z: number = nullVector3.z;
  public readonly dimension: Dimension = overworld;
  public readonly directionVector: DirectionVector = directionVectors.south;
  public readonly yaw: Yaw = 0;
  public readonly pitch: Pitch = 0;

  constructor(options: LocationModelOptions = { location: nullVector3 }) {
    if (options.dimension) {
      this.dimension = options.dimension;
    }

    if (options.directionVector) {
      this.directionVector = options.directionVector;
    }

    this.position = LocationUtils.validateHeight(
      options.location,
      this.dimension,
    );
    this.x = this.position.x;
    this.y = this.position.y;
    this.z = this.position.z;

    const degrees = VectorUtils.calculateRotationDegree(this.directionVector);
    this.pitch = degrees.pitch;
    this.yaw = degrees.yaw;
  }

  /**
   * @returns A simple version of the Location model block position.
   */
  get simple(): LocationModel {
    return new LocationModel({
      location: LocationUtils.simple(this.position),
      dimension: this.dimension,
      directionVector: this.directionVector,
    });
  }
  /**
   * @returns Location model at the center of the block.
   */
  get center(): LocationModel {
    return new LocationModel({
      location: LocationUtils.center(this.position),
      dimension: this.dimension,
      directionVector: this.directionVector,
    });
  }
  /**
   * @returns The Location model dimension name as string.
   */
  get dimensionId(): DimensionTypes {
    return this.dimension.id as DimensionTypes;
  }

  /**
   * @returns Location model params as string.
   */
  stringify(): string {
    return `x:${this.x}, y:${this.y}, z:${this.z}, dimension:${this.dimensionId}, rotation:${this.yaw},${this.pitch}`;
  }

  stringifySimple(): SimpleLocationWithDimensionAsString {
    return `${this.x},${this.y},${this.z},${this.dimensionId}`;
  }

  /**
   * @returns Location model position as string.
   */
  stringifyPosition(): string {
    return JSON.stringify(this.position);
  }

  /**
   * @returns Location model yaw as 'north', 'south', 'east', or 'west'.
   */
  stringifyYawSimple(): YawAsDirectionSimple {
    return VectorUtils.stringifyYawSimple(this.directionVector);
  }

  /**
   * @returns Location model yaw as 'north', 'south', 'east', 'west', 'south_east', 'south_west', 'north_west', 'north_east' or 'unknown'.
   */
  stringifyYaw(): YawAsDirection | undefined {
    return VectorUtils.stringifyYaw(this.yaw);
  }

  /**
   * @returns Location model direction as 'north', 'south', 'east', 'west', 'up' or 'down'.
   */
  stringifyDirectionSimple() {
    return VectorUtils.stringifyDirectionSimple(this.directionVector);
  }

  /**
   * @returns Location model direction as string with all possible direction names.
   */
  stringifyDirection() {
    return VectorUtils.stringifyDirection(this.yaw, this.pitch);
  }

  /**
   * @returns Location model with a new rotation vector values depending on the Pitch input.
   */
  withPitch(pitch: Pitch): LocationModel {
    return new LocationModel({
      location: this.position,
      dimension: this.dimension,
      directionVector: VectorUtils.calculateRotationVector(this.yaw, pitch),
    });
  }

  /**
   * @returns Location model with a new rotation vector values depending on the Yaw input.
   */
  withYaw(yaw: Yaw): LocationModel {
    return new LocationModel({
      location: this.position,
      dimension: this.dimension,
      directionVector: VectorUtils.calculateRotationVector(yaw, this.pitch),
    });
  }

  /**
   * @returns Location model using vertical rotation.
   */
  rotatePitch(rotation: number) {
    return this.withPitch(this.pitch + rotation);
  }

  /**
   * @returns Location model using horizontal rotation.
   */
  rotateYaw(rotation: number) {
    return this.withYaw(this.yaw + rotation);
  }

  /**
   * @returns The location in front of this Location model position based on yaw but not pitch.
   */
  forwardFlat(
    distance: number = 1,
    saveRotation: boolean = true,
  ): LocationModel {
    const resultDirectionVector = this.withPitch(0).directionVector;
    const resultPosition = {
      x: this.x + resultDirectionVector.x * distance,
      y: this.y,
      z: this.z + resultDirectionVector.z * distance,
    };
    let directionVector = this.directionVector;
    if (!saveRotation) {
      directionVector = resultDirectionVector;
    }
    return new LocationModel({
      location: resultPosition,
      dimension: this.dimension,
      directionVector: directionVector,
    });
  }

  /**
   * @returns The location in front of this Location model position based on pitch and yaw.
   */
  forward(distance: number = 1, saveRotation: boolean = true): LocationModel {
    return new LocationModel({
      location: {
        x: this.x + this.directionVector.x * distance,
        y: this.y + this.directionVector.y * distance,
        z: this.z + this.directionVector.z * distance,
      },
      dimension: this.dimension,
      directionVector: saveRotation
        ? this.directionVector
        : this.withPitch(0).withYaw(0).directionVector,
    });
  }

  /**
   * @returns The location in front of this Location model position based on yaw but not pitch.
   */
  backwardFlat(
    distance: number = 1,
    saveRotation: boolean = true,
  ): LocationModel {
    const resultDirectionVector = this.withPitch(0).directionVector;

    return new LocationModel({
      location: {
        x: this.x - resultDirectionVector.x * distance,
        y: this.y,
        z: this.z - resultDirectionVector.z * distance,
      },
      dimension: this.dimension,
      directionVector: saveRotation
        ? this.directionVector
        : resultDirectionVector,
    });
  }

  /**
   * @returns The backword location of this Location model position based on pitch and yaw.
   */
  backward(distance: number = 1, saveRotation: boolean = true) {
    return new LocationModel({
      location: {
        x: this.x - this.directionVector.x * distance,
        y: this.y - this.directionVector.y * distance,
        z: this.z - this.directionVector.z * distance,
      },
      dimension: this.dimension,
      directionVector: saveRotation
        ? this.directionVector
        : this.withPitch(0).withYaw(0).directionVector,
    });
  }

  /**
   * @returns The location to the left of this Location model position based on pitch and yaw.
   */
  left(distance: number = 1, saveRotation: boolean = false) {
    return this.rotateYaw(-90).forwardFlat(distance, saveRotation);
  }

  /**
   * @returns The location to the right of this Location model position based on pitch and yaw.
   */
  right(distance: number = 1, saveRotation: boolean = false) {
    return this.rotateYaw(90).forwardFlat(distance, saveRotation);
  }

  /**
   * @returns The Location model above this location based on pitch and yaw.
   */
  down(distance: number = 1): LocationModel {
    return new LocationModel({
      location: LocationUtils.down(this.position, distance),
      dimension: this.dimension,
      directionVector: this.directionVector,
    });
  }

  /**
   * @returns The location below this location based on pitch and yaw
   */
  up(distance: number = 1): LocationModel {
    return new LocationModel({
      location: LocationUtils.up(this.position, distance),
      dimension: this.dimension,
      directionVector: this.directionVector,
    });
  }

  get isSpawnable(): boolean {
    return this.getBlock()?.isAir ? true : false;
  }

  /**
   * @returns A new Location model based on direction.
   */
  getByDirection(direction: DirectionName) {
    return new LocationModel({
      location: LocationUtils.getByDirection(this.position, direction),
      dimension: this.dimension,
      directionVector: this.directionVector,
    });
  }

  /**
   * @returns The Block of this Location model.
   */
  getBlock(): Block | undefined {
    try {
      const positionBasedBlock = this.dimension.getBlock(this.position);
      if (positionBasedBlock) {
        return positionBasedBlock;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @returns The inventory container of this Location model.
   */
  inventory(): BlockInventoryComponent | undefined {
    const block = this.getBlock();
    if (block) {
      return block.getComponent('inventory');
    }
  }

  /**
   * Sets the block on the current Location model position.
   * @returns { success: false | true }
   */
  setBlock(
    blockName: string = 'air',
    state: BlockState = undefined,
  ): ResultWithSuccess {
    const block = this.getBlock();
    if (!block)
      return {
        success: false,
      };
    if (!state) {
      block.setPermutation(BlockPermutation.resolve(blockName));
    } else {
      block.setPermutation(BlockPermutation.resolve(blockName, state));
    }
    return {
      success: this.matchesMaterial(blockName),
    };
  }

  /**
   * @returns True if the current Location model position material matches
   * at least one input material or state.
   */
  matchesMaterial(
    blockName: string | string[] = 'air',
    state: BlockState = undefined,
  ): boolean {
    const block = this.getBlock();
    if (!block) {
      return false;
    }
    if (Array.isArray(blockName)) {
      const permutation = block.permutation;
      for (const name of blockName) {
        if (permutation.matches(name, state)) {
          return true;
        }
      }

      return false;
    } else {
      return block.permutation.matches(blockName, state);
    }
  }

  /**
   * @returns True if the current Location model position material matches all input materials or states.
   */
  matchesAllMaterials(
    blockName: string[] = ['air'],
    state: BlockState = undefined,
  ): boolean {
    const block = this.getBlock();
    if (!block) {
      return false;
    }
    const permutation = block.permutation;
    for (const name of blockName) {
      if (!permutation.matches(name, state)) {
        return false;
      }
    }

    return true;
  }

  canPlace(options?: CanPlaceBlockOptions): boolean {
    const block = this.getBlock();
    if (!block) {
      return false;
    }
    const permutation = block.permutation;
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
   * @returns True the Location model clone.
   */
  clone() {
    return new LocationModel({
      location: this.position,
      dimension: this.dimension,
      directionVector: this.directionVector,
    });
  }
}
