import { FlagRepositoryId } from './flag-id';
import { FlagTarget } from './flag-target';

export type FlagCreationParams = {
  flagId?: FlagRepositoryId;
  target?: FlagTarget;
};
