import { Entity } from '@minecraft/server';

import { Identifier } from '@inmine/common';

export type ArtifexEntityModelOptions = {
  typeId: Identifier;
  entity?: Entity;
};
