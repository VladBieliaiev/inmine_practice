import { Vector3 } from '@minecraft/server';

import { SchemaMergedWithId, VaultyId } from '@inmine/common';

export type BaseVaultySchema = {
  vaultyId: VaultyId;
  location: Vector3;
};

export type VaultySchema = SchemaMergedWithId<BaseVaultySchema>;
