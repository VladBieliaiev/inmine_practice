import { Dimension, Vector3 } from '@minecraft/server';

import { CreatableClass } from '@inmine/common';

import { ArtifexEntityModelBase } from '../entity-model';

export const createMany = <T extends ArtifexEntityModelBase>(
  model: CreatableClass<T>,
  amount: number = 1,
  location: Vector3,
  dimension: Dimension,
): T[] => {
  const entities: T[] = [];

  for (let i = 0; i < amount; i++) {
    entities.push(new model().spawn(location, dimension));
  }

  return entities;
};
