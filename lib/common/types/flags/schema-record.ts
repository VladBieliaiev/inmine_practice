import { FlagRepositoryId } from './flag-id';
import { FlagValueTypes } from './flag-value-types';

export type FlagSchemaRecord<
  Id extends FlagRepositoryId,
  V extends FlagValueTypes,
> = Record<Id, V>;
