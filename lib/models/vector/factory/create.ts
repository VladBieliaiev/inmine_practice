import { Vector3 } from '@minecraft/server';

import { VectorModel } from '../vector-model';

export function create(
  location: Vector3,
  directionVector?: Vector3,
): VectorModel {
  return new VectorModel(location, directionVector);
}
