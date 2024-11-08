import { Vector3 } from '@minecraft/server';

import { nullVector3 } from '@inmine/common/constants';

export abstract class BaseVectorModel {
  public readonly x: number = nullVector3.x;
  public readonly y: number = nullVector3.y;
  public readonly z: number = nullVector3.z;

  constructor(protected readonly _location: Vector3) {
    this.x = this._location.x;
    this.y = this._location.y;
    this.z = this._location.z;
  }

  get location(): Vector3 {
    return { ...this._location };
  }
}
