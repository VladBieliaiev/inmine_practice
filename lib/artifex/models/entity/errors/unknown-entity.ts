import { ArtifexLogger } from '@inmine/artifex/tools/logger/logger';

import { ArtifexEntityModelBase } from '../entity-model';

export const UnknownEntityError = (model: ArtifexEntityModelBase) => {
  return (
    ArtifexLogger.prefix,
    `Unknown entity tried to create model: ${model.typeId}`
  );
};
