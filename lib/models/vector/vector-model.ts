import { Vector3 } from '@minecraft/server';

import { nullVector3 } from '@inmine/common/constants';
import {
  DirectionName,
  Pitch,
  Yaw,
  YawAsDirection,
  YawAsDirectionSimple,
} from '@inmine/common/types';
import { center } from '@inmine/utils/location/center';
import { down } from '@inmine/utils/location/down';
import { getByDirection } from '@inmine/utils/location/get-by-direction';
import { simple } from '@inmine/utils/location/simple';
import { up } from '@inmine/utils/location/up';
import { VectorUtils } from '@inmine/utils/vector';

import { BaseVectorModel } from './base-vector-model';

export class VectorModel extends BaseVectorModel {
  public readonly yaw: Yaw = 0;
  public readonly pitch: Pitch = 0;

  constructor(
    location: Vector3,
    private readonly _directionVector: Vector3 = nullVector3,
  ) {
    super(location);

    const degrees = VectorUtils.calculateRotationDegree(this.directionVector);
    this.pitch = degrees.pitch;
    this.yaw = degrees.yaw;
  }

  /**
   * @returns A Vector model with a simplified location.
   */
  get simple(): VectorModel {
    return new VectorModel(simple(this.location));
  }
  /**
   * @returns A Vector model at the center of the block.
   */
  get center(): VectorModel {
    return new VectorModel(center(this.location));
  }

  get directionVector(): Vector3 {
    return { ...this._directionVector };
  }

  /**
   * @returns Vector3 as string.
   */
  stringify(): string {
    return JSON.stringify(this.location);
  }

  /**
   * @returns Vector model yaw as 'North', 'South', 'East', or 'West'.
   */
  stringifyYawSimple(): YawAsDirectionSimple {
    return VectorUtils.stringifyYawSimple(this.directionVector);
  }

  /**
   * @returns Vector model yaw as 'North', 'South', 'East', 'West', 'South_East', 'South_West', 'North_West', 'North_East' or 'unknown'.
   */
  stringifyYaw(): YawAsDirection | undefined {
    return VectorUtils.stringifyYaw(this.yaw);
  }

  /**
   * @returns Vector model direction as 'North', 'South', 'East', 'West', 'Up' or 'Down'.
   */
  stringifyDirectionSimple() {
    return VectorUtils.stringifyDirectionSimple(this.directionVector);
  }

  /**
   * @returns Vector model direction as string with all possible direction names.
   */
  stringifyDirection() {
    return VectorUtils.stringifyDirection(this.yaw, this.pitch);
  }

  /**
   * @returns Vector model with a new rotation vector values depending on the Pitch input.
   */
  withPitch(pitch: Pitch): VectorModel {
    return new VectorModel(
      this.location,
      VectorUtils.calculateRotationVector(this.yaw, pitch),
    );
  }

  /**
   * @returns Vector model with a new rotation vector values depending on the Yaw input.
   */
  withYaw(yaw: Yaw): VectorModel {
    return new VectorModel(
      this.location,
      VectorUtils.calculateRotationVector(yaw, this.pitch),
    );
  }

  /**
   * @returns Vector model using vertical rotation.
   */
  rotatePitch(rotation: number): VectorModel {
    return this.withPitch(this.pitch + rotation);
  }

  /**
   * @returns Vector model using horizontal rotation.
   */
  rotateYaw(rotation: number): VectorModel {
    return this.withYaw(this.yaw + rotation);
  }

  /**
   * @returns A new Vector model in front of this Vector model location based on yaw but not pitch.
   */
  forwardFlat(distance: number = 1, saveRotation: boolean = true): VectorModel {
    const resultDirectionVector = this.withPitch(0).directionVector;

    return new VectorModel(
      {
        x: this.x + resultDirectionVector.x * distance,
        y: this.y,
        z: this.z + resultDirectionVector.z * distance,
      },
      saveRotation ? this.directionVector : resultDirectionVector,
    );
  }

  /**
   * @returns A new Vector model in front of this Vector model location based on pitch and yaw.
   */
  forward(distance: number = 1, saveRotation: boolean = true): VectorModel {
    const directionVector = this.directionVector;

    return new VectorModel(
      {
        x: this.x + directionVector.x * distance,
        y: this.y + directionVector.y * distance,
        z: this.z + directionVector.z * distance,
      },
      saveRotation
        ? directionVector
        : this.withPitch(0).withYaw(0).directionVector,
    );
  }

  /**
   * @returns A new backword Vector model based on pitch but not yaw.
   */
  backwardFlat(
    distance: number = 1,
    saveRotation: boolean = true,
  ): VectorModel {
    const resultDirectionVector = this.withPitch(0).directionVector;

    return new VectorModel(
      {
        x: this.x - resultDirectionVector.x * distance,
        y: this.y,
        z: this.z - resultDirectionVector.z * distance,
      },
      saveRotation ? this.directionVector : resultDirectionVector,
    );
  }

  /**
   * @returns A new backword Vector model based on current pitch and yaw.
   */
  backward(distance: number = 1, saveRotation: boolean = true) {
    const directionVector = this.directionVector;

    return new VectorModel(
      {
        x: this.x - directionVector.x * distance,
        y: this.y - directionVector.y * distance,
        z: this.z - directionVector.z * distance,
      },
      saveRotation
        ? directionVector
        : this.withPitch(0).withYaw(0).directionVector,
    );
  }

  /**
   * @returns A new Vector model to the left of this Vector model location based on pitch and yaw.
   */
  left(distance: number = 1, saveRotation: boolean = false) {
    return this.rotateYaw(-90).forwardFlat(distance, saveRotation);
  }

  /**
   * @returns A new Vector model to the right of this Vector model location based on pitch and yaw.
   */
  right(distance: number = 1, saveRotation: boolean = false) {
    return this.rotateYaw(90).forwardFlat(distance, saveRotation);
  }

  /**
   * @returns The Vector model below this Vector model.
   */
  down(distance: number = 1): VectorModel {
    return new VectorModel(down(this.location, distance), this.directionVector);
  }

  /**
   * @returns A new Vector model above this Vector model.
   */
  up(distance: number = 1): VectorModel {
    return new VectorModel(up(this.location, distance), this.directionVector);
  }

  /**
   * @returns A new Vector model based on direction.
   */
  getByDirectionName(direction: DirectionName) {
    return new VectorModel(
      getByDirection(this.location, direction),
      this.directionVector,
    );
  }

  /**
   * @returns Current Vector model clone.
   */
  clone() {
    return new VectorModel(this.location, this.directionVector);
  }
}
