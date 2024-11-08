import { Entity } from '@minecraft/server';

import { Identifier } from '@inmine/common';

export class ArtifexAbstractEntityModel {
  static readonly typeId: Identifier;

  constructor(entity?: Entity) {}
}
