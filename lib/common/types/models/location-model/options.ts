import { Dimension, Vector3 } from '@minecraft/server';

import { DirectionVector } from '@inmine/common';

export type LocationModelOptions = {
  location: Vector3;
  dimension?: Dimension;
  directionVector?: DirectionVector;
};
