import { storageElementIdentifier } from '@inmine/repository/vaulty/common/storage-element';

/** Amount of chunks */
export const vaultySpiralLocationStep = 25;

export const vaultyChunkRecordPropertyId = 'inmine-vaulty-chunk-record';

export const vaultyRepositoryId = 'inmine-vaulty-repository';

export const vaultyDefaultSize = 54;

export const vaultyMaxEntityPerChunk = 8;

export const vaultyEntityQueryOptions = {
  type: storageElementIdentifier,
  maxDistance: 15,
  closest: 1,
};

export const vaultyChunkLoadOptions = {
  duration: 20 * 10,
  range: 2,
};

export const vaultyTryFindEntityOptions = {
  attempts: 10,
  delay: 4,
};
